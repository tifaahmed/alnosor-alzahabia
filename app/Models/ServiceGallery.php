<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Translatable\HasTranslations;

class ServiceGallery extends Model
{
    use HasTranslations;

    protected $fillable = [
        'service_id',
        'media_path',
        'media_type',
        'caption',
        'sort',
    ];

    public array $translatable = ['caption'];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
