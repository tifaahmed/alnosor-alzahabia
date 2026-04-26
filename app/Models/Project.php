<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Translatable\HasTranslations;

class Project extends Model
{
    use HasTranslations;

    protected $fillable = [
        'project_category_id',
        'title',
        'subject',
        'project_date',
        'address',
        'media_path',
        'media_type',
        'sort',
    ];

    protected $casts = [
        'project_date' => 'date',
    ];

    public array $translatable = ['title', 'subject', 'address'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProjectCategory::class, 'project_category_id');
    }
}
