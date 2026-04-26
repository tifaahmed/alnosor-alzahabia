<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        $services = Service::withCount('galleries')
            ->orderBy('sort')
            ->orderBy('id')
            ->get()
            ->map(fn ($s) => $this->serialize($s, withGalleries: false));

        return Inertia::render('dashboard/services/index', [
            'services' => $services,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateData($request, imageRequired: false);

        $slug = $this->uniqueSlug($data['slug'] ?? ($data['title']['en'] ?? $data['title']['ar']));

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $this->storeImage($request->file('image'), $slug);
        }

        Service::create([
            'slug' => $slug,
            'icon' => $data['icon'] ?? null,
            'image_path' => $imagePath,
            'title' => $this->trans($data, 'title') ?? [],
            'body' => $this->trans($data, 'body'),
            'bullets' => $this->bulletsTrans($data),
            'sort' => $data['sort'] ?? (Service::max('sort') + 1),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Service created.']);

        return to_route('dashboard.services.index');
    }

    public function update(Request $request, Service $service): RedirectResponse
    {
        $data = $this->validateData($request, imageRequired: false, ignoreSlugId: $service->id);

        $service->slug = $this->uniqueSlug(
            $data['slug'] ?? ($data['title']['en'] ?? $data['title']['ar']),
            ignoreId: $service->id,
        );
        $service->icon = $data['icon'] ?? null;
        $service->setTranslations('title', $this->trans($data, 'title') ?? []);
        $service->setTranslations('body', $this->trans($data, 'body') ?? []);
        $service->setTranslations('bullets', $this->bulletsTrans($data) ?? []);
        $service->sort = $data['sort'] ?? $service->sort;

        if ($request->hasFile('image')) {
            $this->deleteFile($service->image_path);
            $service->image_path = $this->storeImage($request->file('image'), $service->slug);
        } elseif ($request->boolean('remove_image')) {
            $this->deleteFile($service->image_path);
            $service->image_path = null;
        }

        $service->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Service updated.']);

        return to_route('dashboard.services.index');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $imagePath = $service->image_path;
        $galleryPaths = $service->galleries()->pluck('media_path')->all();

        $service->delete();

        $this->deleteFile($imagePath);
        foreach ($galleryPaths as $p) {
            $this->deleteFile($p);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Service deleted.']);

        return to_route('dashboard.services.index');
    }

    private function validateData(Request $request, bool $imageRequired, ?int $ignoreSlugId = null): array
    {
        $imageRule = $imageRequired ? 'required' : 'nullable';

        return $request->validate([
            'slug' => ['nullable', 'string', 'max:120'],
            'icon' => ['nullable', 'string', 'max:80'],
            'title.ar' => ['nullable', 'string', 'max:200'],
            'title.en' => ['nullable', 'string', 'max:200'],
            'body.ar' => ['nullable', 'string', 'max:2000'],
            'body.en' => ['nullable', 'string', 'max:2000'],
            'bullets.ar' => ['nullable', 'array'],
            'bullets.ar.*' => ['nullable', 'string', 'max:255'],
            'bullets.en' => ['nullable', 'array'],
            'bullets.en.*' => ['nullable', 'string', 'max:255'],
            'sort' => ['nullable', 'integer', 'min:0'],
            'image' => [$imageRule, 'file', 'mimes:jpg,jpeg,png,gif,webp,avif', 'max:10240'],
            'remove_image' => ['nullable', 'boolean'],
        ]);
    }

    private function trans(array $data, string $key): ?array
    {
        $values = array_filter([
            'ar' => $data[$key]['ar'] ?? null,
            'en' => $data[$key]['en'] ?? null,
        ], fn ($v) => $v !== null && $v !== '');

        return $values ?: null;
    }

    private function bulletsTrans(array $data): ?array
    {
        $clean = function (?array $arr) {
            if (! is_array($arr)) {
                return null;
            }
            $filtered = array_values(array_filter(
                array_map(fn ($v) => is_string($v) ? trim($v) : '', $arr),
                fn ($v) => $v !== '',
            ));

            return $filtered ?: null;
        };

        $values = array_filter([
            'ar' => $clean($data['bullets']['ar'] ?? null),
            'en' => $clean($data['bullets']['en'] ?? null),
        ], fn ($v) => $v !== null);

        return $values ?: null;
    }

    private function uniqueSlug(?string $source, ?int $ignoreId = null): string
    {
        $base = Str::slug($source ?? '');
        if ($base === '') {
            $base = 'service';
        }
        $slug = $base;
        $i = 2;
        while (Service::where('slug', $slug)->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))->exists()) {
            $slug = $base.'-'.$i++;
        }

        return $slug;
    }

    private function storeImage(\Illuminate\Http\UploadedFile $file, string $slug): string
    {
        $ext = strtolower($file->getClientOriginalExtension());
        $name = $slug.'-'.uniqid().'.'.$ext;

        $dir = public_path('images/services');
        if (! is_dir($dir)) {
            @mkdir($dir, 0755, true);
        }

        $file->move($dir, $name);

        return '/images/services/'.$name;
    }

    private function deleteFile(?string $relativePath): void
    {
        if (! $relativePath) {
            return;
        }
        $full = public_path(ltrim($relativePath, '/'));
        if (is_file($full)) {
            @unlink($full);
        }
    }

    private function serialize(Service $s, bool $withGalleries = true): array
    {
        $data = [
            'id' => $s->id,
            'slug' => $s->slug,
            'icon' => $s->icon,
            'image_path' => $s->image_path,
            'title' => $s->getTranslations('title'),
            'body' => $s->getTranslations('body'),
            'bullets' => $s->getTranslations('bullets'),
            'sort' => $s->sort,
            'galleries_count' => $s->galleries_count ?? null,
        ];

        if ($withGalleries) {
            $data['galleries'] = $s->galleries->map(fn ($g) => [
                'id' => $g->id,
                'media_path' => $g->media_path,
                'media_type' => $g->media_type,
                'caption' => $g->getTranslations('caption'),
                'sort' => $g->sort,
            ])->all();
        }

        return $data;
    }
}
