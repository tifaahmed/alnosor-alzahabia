<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

class ProjectCategory extends Model
{
    use HasTranslations;

    protected $fillable = ['name', 'slug', 'folder', 'sort'];

    public array $translatable = ['name'];

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }
}
