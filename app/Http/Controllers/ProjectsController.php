<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectsController extends Controller
{
    public function index(Request $request): Response
    {
        $slug = $request->string('category')->toString() ?: null;

        $categoriesQuery = ProjectCategory::withCount('projects')
            ->orderBy('sort')
            ->orderBy('id')
            ->get();

        $categories = $categoriesQuery->map(fn ($c) => [
            'id' => $c->id,
            'name' => $c->getTranslations('name'),
            'slug' => $c->slug,
            'projects_count' => $c->projects_count,
        ]);

        $query = Project::query()
            ->with('category')
            ->orderByDesc('id');

        if ($slug) {
            $category = $categoriesQuery->firstWhere('slug', $slug);
            if ($category) {
                $query->where('project_category_id', $category->id);
            }
        }

        $projects = $query->get()->map(fn ($p) => [
            'id' => $p->id,
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
        ]);

        return Inertia::render('projects', [
            'projects' => $projects,
            'categories' => $categories,
            'activeCategory' => $slug,
        ]);
    }
}
