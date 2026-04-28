<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\ServiceCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceCategoryController extends Controller
{
    public function index(): Response
    {
        $categories = ServiceCategory::withCount('services')
            ->orderBy('sort')
            ->orderBy('id')
            ->get()
            ->map(fn ($c) => [
                'id' => $c->id,
                'key' => $c->key,
                'name' => $c->getTranslations('name'),
                'sort' => $c->sort,
                'services_count' => $c->services_count,
            ]);

        return Inertia::render('dashboard/service-categories/index', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateData($request);

        ServiceCategory::create([
            'key' => $this->uniqueKey($data['key'] ?? ($data['name']['en'] ?? $data['name']['ar'])),
            'name' => array_filter([
                'ar' => $data['name']['ar'],
                'en' => $data['name']['en'] ?? null,
            ]),
            'sort' => $data['sort'] ?? (ServiceCategory::max('sort') + 1),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Category created.']);

        return to_route('dashboard.service-categories.index');
    }

    public function update(Request $request, ServiceCategory $category): RedirectResponse
    {
        $data = $this->validateData($request, ignoreId: $category->id);

        if (! empty($data['key']) && $data['key'] !== $category->key) {
            $category->key = $this->uniqueKey($data['key'], ignoreId: $category->id);
        }

        $category->setTranslations('name', array_filter([
            'ar' => $data['name']['ar'],
            'en' => $data['name']['en'] ?? null,
        ]));
        $category->sort = $data['sort'] ?? $category->sort;
        $category->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Category updated.']);

        return to_route('dashboard.service-categories.index');
    }

    public function destroy(ServiceCategory $category): RedirectResponse
    {
        $category->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Category deleted. Services in it are now uncategorised.']);

        return to_route('dashboard.service-categories.index');
    }

    private function validateData(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'key' => ['nullable', 'string', 'max:80', 'regex:/^[a-z0-9_-]+$/i'],
            'name.ar' => ['required', 'string', 'max:120'],
            'name.en' => ['nullable', 'string', 'max:120'],
            'sort' => ['nullable', 'integer', 'min:0'],
        ]);
    }

    private function uniqueKey(?string $source, ?int $ignoreId = null): string
    {
        $base = Str::slug($source ?? '');
        if ($base === '') {
            $base = 'category';
        }
        $key = $base;
        $i = 2;
        while (ServiceCategory::where('key', $key)
            ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
            ->exists()
        ) {
            $key = $base.'-'.$i++;
        }

        return $key;
    }
}
