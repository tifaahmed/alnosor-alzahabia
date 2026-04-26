<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

class Service extends Model
{
    use HasTranslations;

    protected $fillable = [
        'slug',
        'icon',
        'image_path',
        'title',
        'body',
        'bullets',
        'sort',
    ];

    public array $translatable = ['title', 'body', 'bullets'];

    public function galleries(): HasMany
    {
        return $this->hasMany(ServiceGallery::class)->orderBy('sort')->orderBy('id');
    }
}
