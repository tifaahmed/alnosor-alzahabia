<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\ProjectCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectCategoryController extends Controller
{
    public function index(): Response
    {
        $categories = ProjectCategory::withCount('projects')
            ->orderBy('sort')
            ->orderBy('id')
            ->get()
            ->map(fn ($c) => [
                'id' => $c->id,
                'name' => $c->getTranslations('name'),
                'slug' => $c->slug,
                'folder' => $c->folder,
                'sort' => $c->sort,
                'projects_count' => $c->projects_count,
            ]);

        return Inertia::render('dashboard/project-categories/index', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name.ar' => ['required', 'string', 'max:120'],
            'name.en' => ['nullable', 'string', 'max:120'],
            'sort' => ['nullable', 'integer', 'min:0'],
        ]);

        $primary = $data['name']['ar'];
        $folder = $this->uniqueFolder($primary);
        $slug = $this->uniqueSlug($data['name']['en'] ?? $primary);

        ProjectCategory::create([
            'name' => array_filter([
                'ar' => $data['name']['ar'],
                'en' => $data['name']['en'] ?? null,
            ]),
            'slug' => $slug,
            'folder' => $folder,
            'sort' => $data['sort'] ?? ProjectCategory::max('sort') + 1,
        ]);

        $this->ensureDir($folder);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Category created.']);

        return to_route('dashboard.project-categories.index');
    }

    public function update(Request $request, ProjectCategory $category): RedirectResponse
    {
        $data = $request->validate([
            'name.ar' => ['required', 'string', 'max:120'],
            'name.en' => ['nullable', 'string', 'max:120'],
            'sort' => ['nullable', 'integer', 'min:0'],
        ]);

        $category->setTranslations('name', array_filter([
            'ar' => $data['name']['ar'],
            'en' => $data['name']['en'] ?? null,
        ]));
        $category->sort = $data['sort'] ?? $category->sort;
        $category->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Category updated.']);

        return to_route('dashboard.project-categories.index');
    }

    public function destroy(ProjectCategory $category): RedirectResponse
    {
        $folderPath = public_path('images/projects/'.$category->folder);

        $category->delete();

        if (is_dir($folderPath)) {
            $this->removeDirRecursive($folderPath);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Category deleted.']);

        return to_route('dashboard.project-categories.index');
    }

    private function uniqueSlug(string $name): string
    {
        $base = Str::slug($name);
        if ($base === '') {
            $base = trim(preg_replace('/\s+/u', '-', $name) ?? 'category');
        }
        $slug = $base;
        $i = 2;
        while (ProjectCategory::where('slug', $slug)->exists()) {
            $slug = $base.'-'.$i++;
        }

        return $slug;
    }

    private function uniqueFolder(string $name): string
    {
        $base = trim($name);
        $folder = $base;
        $i = 2;
        while (ProjectCategory::where('folder', $folder)->exists()
            || is_dir(public_path('images/projects/'.$folder))) {
            $folder = $base.' '.$i++;
        }

        return $folder;
    }

    private function ensureDir(string $folder): void
    {
        $path = public_path('images/projects/'.$folder);
        if (! is_dir($path)) {
            @mkdir($path, 0755, true);
        }
    }

    private function removeDirRecursive(string $path): void
    {
        if (! is_dir($path)) {
            return;
        }
        foreach (scandir($path) as $entry) {
            if ($entry === '.' || $entry === '..') {
                continue;
            }
            $full = $path.'/'.$entry;
            is_dir($full) ? $this->removeDirRecursive($full) : @unlink($full);
        }
        @rmdir($path);
    }
}
