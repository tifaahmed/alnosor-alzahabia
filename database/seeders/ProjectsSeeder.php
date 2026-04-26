<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectCategory;
use Illuminate\Database\Seeder;

class ProjectsSeeder extends Seeder
{
    private const CATEGORY_MAP = [
        'ارضيات' => ['slug' => 'flooring', 'en' => 'Flooring'],
        'اعمال انشائيه' => ['slug' => 'construction-works', 'en' => 'Construction Works'],
        'توصيل مياه' => ['slug' => 'water-connection', 'en' => 'Water Connection'],
        'ديكورات' => ['slug' => 'decorations', 'en' => 'Decorations'],
        'سباكه' => ['slug' => 'plumbing', 'en' => 'Plumbing'],
        'سباكه حمامات' => ['slug' => 'bathroom-plumbing', 'en' => 'Bathroom Plumbing'],
        'فلاتر' => ['slug' => 'filters', 'en' => 'Water Filters'],
        'نقاشه' => ['slug' => 'painting', 'en' => 'Painting'],
    ];

    private const VIDEO_EXT = ['mp4', 'mov', 'webm', 'm4v', 'ogg'];

    private const IMAGE_EXT = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'];

    public function run(): void
    {
        $base = public_path('images/projects');

        if (! is_dir($base)) {
            $this->command?->warn("Folder not found: {$base}");

            return;
        }

        $folders = array_filter(scandir($base), fn ($f) => $f !== '.' && $f !== '..' && is_dir($base.'/'.$f));

        $sort = 0;
        foreach ($folders as $folder) {
            $mapped = self::CATEGORY_MAP[$folder] ?? null;
            $slug = $mapped['slug'] ?? $this->fallbackSlug($folder);
            $name = ['ar' => $folder, 'en' => $mapped['en'] ?? $folder];

            $category = ProjectCategory::firstOrCreate(
                ['folder' => $folder],
                ['name' => $name, 'slug' => $slug, 'sort' => $sort++],
            );

            $this->seedFiles($category, $base.'/'.$folder);
        }
    }

    private function seedFiles(ProjectCategory $category, string $dir): void
    {
        $files = scandir($dir);
        $sort = 0;

        foreach ($files as $file) {
            if ($file === '.' || $file === '..') {
                continue;
            }

            if (str_ends_with($file, ':Zone.Identifier')) {
                continue;
            }

            $full = $dir.'/'.$file;
            if (! is_file($full)) {
                continue;
            }

            $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            $type = match (true) {
                in_array($ext, self::VIDEO_EXT, true) => 'video',
                in_array($ext, self::IMAGE_EXT, true) => 'image',
                default => null,
            };

            if (! $type) {
                continue;
            }

            $relative = '/images/projects/'.$category->folder.'/'.$file;

            Project::firstOrCreate(
                ['project_category_id' => $category->id, 'media_path' => $relative],
                [
                    'title' => null,
                    'media_type' => $type,
                    'sort' => $sort++,
                ],
            );
        }
    }

    private function fallbackSlug(string $name): string
    {
        $base = trim(preg_replace('/\s+/u', '-', $name) ?? '');
        if ($base === '') {
            $base = 'category';
        }

        $slug = $base;
        $i = 2;
        while (ProjectCategory::where('slug', $slug)->exists()) {
            $slug = $base.'-'.$i++;
        }

        return $slug;
    }
}
