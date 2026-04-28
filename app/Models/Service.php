<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

class Service extends Model
{
    use HasTranslations;

    protected $fillable = [
        'slug',
        'icon',
        'service_category_id',
        'image_path',
        'title',
        'body',
        'bullets',
        'sort',
    ];

    public array $translatable = ['title', 'body', 'bullets'];

    public function serviceCategory(): BelongsTo
    {
        return $this->belongsTo(ServiceCategory::class);
    }

    public function galleries(): HasMany
    {
        return $this->hasMany(ServiceGallery::class)->orderBy('sort')->orderBy('id');
    }
}
