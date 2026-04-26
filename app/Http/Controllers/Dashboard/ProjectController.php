<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $categoryId = $request->integer('category') ?: null;

        $query = Project::with('category')
            ->orderByDesc('id');

        if ($categoryId) {
            $query->where('project_category_id', $categoryId);
        }

        $projects = $query->paginate(24)->withQueryString();
        $projects->getCollection()->transform(fn ($p) => $this->serializeProject($p));

        return Inertia::render('dashboard/projects/index', [
            'projects' => $projects,
            'categories' => ProjectCategory::orderBy('sort')->orderBy('id')->get()
                ->map(fn ($c) => [
                    'id' => $c->id,
                    'name' => $c->getTranslations('name'),
                    'slug' => $c->slug,
                ]),
            'filters' => ['category' => $categoryId],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateData($request, mediaRequired: true);

        $category = ProjectCategory::findOrFail($data['project_category_id']);
        [$path, $type] = $this->storeMedia($request->file('media'), $category);

        Project::create([
            'project_category_id' => $category->id,
            'title' => $this->trans($data, 'title'),
            'subject' => $this->trans($data, 'subject'),
            'project_date' => $data['project_date'] ?? null,
            'address' => $this->trans($data, 'address'),
            'media_path' => $path,
            'media_type' => $type,
            'sort' => Project::where('project_category_id', $category->id)->max('sort') + 1,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Project created.']);

        return back();
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $data = $this->validateData($request, mediaRequired: false);

        $category = ProjectCategory::findOrFail($data['project_category_id']);

        $project->project_category_id = $category->id;
        $project->setTranslations('title', $this->trans($data, 'title') ?? []);
        $project->setTranslations('subject', $this->trans($data, 'subject') ?? []);
        $project->setTranslations('address', $this->trans($data, 'address') ?? []);
        $project->project_date = $data['project_date'] ?? null;

        if ($request->hasFile('media')) {
            $this->deleteMedia($project->media_path);
            [$path, $type] = $this->storeMedia($request->file('media'), $category);
            $project->media_path = $path;
            $project->media_type = $type;
        }

        $project->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Project updated.']);

        return back();
    }

    private function validateData(Request $request, bool $mediaRequired): array
    {
        $mediaRule = $mediaRequired ? 'required' : 'nullable';

        return $request->validate([
            'project_category_id' => ['required', 'exists:project_categories,id'],
            'title.ar' => ['nullable', 'string', 'max:200'],
            'title.en' => ['nullable', 'string', 'max:200'],
            'subject.ar' => ['nullable', 'string', 'max:200'],
            'subject.en' => ['nullable', 'string', 'max:200'],
            'address.ar' => ['nullable', 'string', 'max:255'],
            'address.en' => ['nullable', 'string', 'max:255'],
            'project_date' => ['nullable', 'date'],
            'media' => [$mediaRule, 'file', 'mimes:jpg,jpeg,png,gif,webp,avif,mp4,mov,webm,m4v,ogg', 'max:51200'],
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

    private function serializeProject(Project $p): array
    {
        return [
            'id' => $p->id,
            'project_category_id' => $p->project_category_id,
            'title' => $p->getTranslations('title'),
            'subject' => $p->getTranslations('subject'),
            'project_date' => $p->project_date?->toDateString(),
            'address' => $p->getTranslations('address'),
            'media_path' => $p->media_path,
            'media_type' => $p->media_type,
            'category' => $p->category ? [
                'id' => $p->category->id,
                'name' => $p->category->getTranslations('name'),
                'slug' => $p->category->slug,
            ] : null,
        ];
    }

    public function destroy(Project $project): RedirectResponse
    {
        $path = $project->media_path;
        $project->delete();
        $this->deleteMedia($path);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Project deleted.']);

        return back();
    }

    /**
     * @return array{0:string,1:string}
     */
    private function storeMedia(\Illuminate\Http\UploadedFile $file, ProjectCategory $category): array
    {
        $ext = strtolower($file->getClientOriginalExtension());
        $videoExt = ['mp4', 'mov', 'webm', 'm4v', 'ogg'];
        $type = in_array($ext, $videoExt, true) ? 'video' : 'image';

        $base = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) ?: 'media';
        $name = $base.'-'.uniqid().'.'.$ext;

        $dir = public_path('images/projects/'.$category->folder);
        if (! is_dir($dir)) {
            @mkdir($dir, 0755, true);
        }

        $file->move($dir, $name);

        return ['/images/projects/'.$category->folder.'/'.$name, $type];
    }

    private function deleteMedia(?string $relativePath): void
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
