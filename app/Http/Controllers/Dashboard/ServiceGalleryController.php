<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServiceGallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceGalleryController extends Controller
{
    public function index(Service $service): Response
    {
        $service->load('galleries');

        return Inertia::render('dashboard/services/galleries', [
            'service' => [
                'id' => $service->id,
                'slug' => $service->slug,
                'title' => $service->getTranslations('title'),
            ],
            'galleries' => $service->galleries->map(fn ($g) => [
                'id' => $g->id,
                'media_path' => $g->media_path,
                'media_type' => $g->media_type,
                'caption' => $g->getTranslations('caption'),
                'sort' => $g->sort,
            ])->all(),
        ]);
    }

    public function store(Request $request, Service $service): RedirectResponse
    {
        $data = $this->validateData($request, mediaRequired: true);

        [$path, $type] = $this->storeMedia($request->file('media'), $service);

        ServiceGallery::create([
            'service_id' => $service->id,
            'media_path' => $path,
            'media_type' => $type,
            'caption' => $this->trans($data, 'caption'),
            'sort' => ServiceGallery::where('service_id', $service->id)->max('sort') + 1,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Gallery item added.']);

        return back();
    }

    public function update(Request $request, Service $service, ServiceGallery $gallery): RedirectResponse
    {
        abort_unless($gallery->service_id === $service->id, 404);

        $data = $this->validateData($request, mediaRequired: false);

        $gallery->setTranslations('caption', $this->trans($data, 'caption') ?? []);

        if ($request->hasFile('media')) {
            $this->deleteFile($gallery->media_path);
            [$path, $type] = $this->storeMedia($request->file('media'), $service);
            $gallery->media_path = $path;
            $gallery->media_type = $type;
        }

        $gallery->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Gallery item updated.']);

        return back();
    }

    public function destroy(Service $service, ServiceGallery $gallery): RedirectResponse
    {
        abort_unless($gallery->service_id === $service->id, 404);

        $path = $gallery->media_path;
        $gallery->delete();
        $this->deleteFile($path);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Gallery item deleted.']);

        return back();
    }

    private function validateData(Request $request, bool $mediaRequired): array
    {
        $mediaRule = $mediaRequired ? 'required' : 'nullable';

        return $request->validate([
            'media' => [$mediaRule, 'file', 'mimes:jpg,jpeg,png,gif,webp,avif,mp4,mov,webm,m4v,ogg', 'max:51200'],
            'caption.ar' => ['nullable', 'string', 'max:500'],
            'caption.en' => ['nullable', 'string', 'max:500'],
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

    /**
     * @return array{0:string,1:string}
     */
    private function storeMedia(\Illuminate\Http\UploadedFile $file, Service $service): array
    {
        $ext = strtolower($file->getClientOriginalExtension());
        $videoExt = ['mp4', 'mov', 'webm', 'm4v', 'ogg'];
        $type = in_array($ext, $videoExt, true) ? 'video' : 'image';

        $base = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) ?: 'media';
        $name = $base.'-'.uniqid().'.'.$ext;

        $dir = public_path('images/services/galleries/'.$service->slug);
        if (! is_dir($dir)) {
            @mkdir($dir, 0755, true);
        }

        $file->move($dir, $name);

        return ['/images/services/galleries/'.$service->slug.'/'.$name, $type];
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
}
