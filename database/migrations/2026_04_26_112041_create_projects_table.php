<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_category_id')
                ->constrained('project_categories')
                ->cascadeOnDelete();
            $table->json('title')->nullable();
            $table->json('subject')->nullable();
            $table->date('project_date')->nullable();
            $table->json('address')->nullable();
            $table->string('media_path');
            $table->enum('media_type', ['image', 'video'])->default('image');
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();

            $table->index('project_category_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
