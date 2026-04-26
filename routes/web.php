<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\Dashboard\ProjectCategoryController;
use App\Http\Controllers\Dashboard\ProjectController;
use App\Http\Controllers\Dashboard\ServiceController;
use App\Http\Controllers\Dashboard\ServiceGalleryController;
use App\Http\Controllers\ProjectsController;
use App\Models\Service;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::inertia('/', 'home', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::inertia('/about', 'about')->name('about');
Route::get('/projects', [ProjectsController::class, 'index'])->name('projects');
Route::inertia('/services', 'services')->name('services');
Route::get('/services/{slug}', function (string $slug) {
    $service = Service::where('slug', $slug)->with('galleries')->first();

    return Inertia::render('service-detail', [
        'slug' => $slug,
        'galleries' => $service ? $service->galleries->map(fn ($g) => [
            'id' => $g->id,
            'media_path' => $g->media_path,
            'media_type' => $g->media_type,
            'caption' => $g->getTranslations('caption'),
            'sort' => $g->sort,
        ])->all() : [],
    ]);
})->name('services.show');
Route::inertia('/contact', 'contact')->name('contact');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

Route::get('/sitemap.xml', function () {
    $base = rtrim(config('app.url'), '/');
    $today = now()->toDateString();
    $serviceSlugs = [
        'commercial-brokers',
        'building-materials',
        'decoration-partitions',
        'e-commerce',
        'project-management',
        'interior-design',
        'equipment-rental',
        'event-management',
    ];
    $urls = [
        ['loc' => $base . '/', 'priority' => '1.0', 'changefreq' => 'weekly'],
        ['loc' => $base . '/about', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ['loc' => $base . '/services', 'priority' => '0.9', 'changefreq' => 'weekly'],
        ['loc' => $base . '/projects', 'priority' => '0.9', 'changefreq' => 'weekly'],
        ['loc' => $base . '/contact', 'priority' => '0.8', 'changefreq' => 'yearly'],
    ];
    foreach ($serviceSlugs as $slug) {
        $urls[] = ['loc' => $base . '/services/' . $slug, 'priority' => '0.7', 'changefreq' => 'monthly'];
    }
    $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'."\n";
    foreach ($urls as $u) {
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$u['loc']}</loc>\n";
        $xml .= "    <lastmod>{$today}</lastmod>\n";
        $xml .= "    <changefreq>{$u['changefreq']}</changefreq>\n";
        $xml .= "    <priority>{$u['priority']}</priority>\n";
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"ar\" href=\"{$u['loc']}\"/>\n";
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"{$u['loc']}\"/>\n";
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"{$u['loc']}\"/>\n";
        $xml .= "  </url>\n";
    }
    $xml .= '</urlset>';
    return response($xml, 200)->header('Content-Type', 'application/xml');
})->name('sitemap');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('project-categories', [ProjectCategoryController::class, 'index'])->name('project-categories.index');
        Route::post('project-categories', [ProjectCategoryController::class, 'store'])->name('project-categories.store');
        Route::put('project-categories/{category}', [ProjectCategoryController::class, 'update'])->name('project-categories.update');
        Route::delete('project-categories/{category}', [ProjectCategoryController::class, 'destroy'])->name('project-categories.destroy');

        Route::get('projects', [ProjectController::class, 'index'])->name('projects.index');
        Route::post('projects', [ProjectController::class, 'store'])->name('projects.store');
        Route::post('projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
        Route::delete('projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');

        Route::get('services', [ServiceController::class, 'index'])->name('services.index');
        Route::post('services', [ServiceController::class, 'store'])->name('services.store');
        Route::post('services/{service}', [ServiceController::class, 'update'])->name('services.update');
        Route::delete('services/{service}', [ServiceController::class, 'destroy'])->name('services.destroy');

        Route::get('services/{service}/galleries', [ServiceGalleryController::class, 'index'])->name('services.galleries.index');
        Route::post('services/{service}/galleries', [ServiceGalleryController::class, 'store'])->name('services.galleries.store');
        Route::post('services/{service}/galleries/{gallery}', [ServiceGalleryController::class, 'update'])->name('services.galleries.update');
        Route::delete('services/{service}/galleries/{gallery}', [ServiceGalleryController::class, 'destroy'])->name('services.galleries.destroy');
    });
});

require __DIR__.'/settings.php';
