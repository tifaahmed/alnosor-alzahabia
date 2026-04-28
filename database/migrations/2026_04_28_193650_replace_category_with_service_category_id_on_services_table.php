<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Default catalogue of category keys with their bilingual names.
     * Used to backfill the new table when migrating legacy services.
     *
     * @var array<int, array{key:string,name:array{ar:string,en:string},sort:int}>
     */
    private array $defaults = [
        ['key' => 'maintenance', 'name' => ['ar' => 'الصيانة العامة', 'en' => 'General Maintenance'], 'sort' => 1],
        ['key' => 'finishing', 'name' => ['ar' => 'أعمال التشطيبات والبناء', 'en' => 'Finishing & Construction'], 'sort' => 2],
        ['key' => 'mep', 'name' => ['ar' => 'السباكة والكهرباء', 'en' => 'Plumbing & Electrical'], 'sort' => 3],
        ['key' => 'woodwork', 'name' => ['ar' => 'النجارة والحدادة', 'en' => 'Carpentry & Ironwork'], 'sort' => 4],
        ['key' => 'exterior', 'name' => ['ar' => 'الأعمال الخارجية', 'en' => 'External Works'], 'sort' => 5],
        ['key' => 'renovation', 'name' => ['ar' => 'التكسير والتجديد', 'en' => 'Demolition & Renovation'], 'sort' => 6],
    ];

    public function up(): void
    {
        $this->seedDefaultCategories();

        Schema::table('services', function (Blueprint $table) {
            $table->foreignId('service_category_id')
                ->nullable()
                ->after('category')
                ->constrained('service_categories')
                ->nullOnDelete();
        });

        $this->backfillForeignKey();

        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('category');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->string('category')->nullable()->after('icon');
        });

        $this->restoreCategoryString();

        Schema::table('services', function (Blueprint $table) {
            $table->dropConstrainedForeignId('service_category_id');
        });
    }

    private function seedDefaultCategories(): void
    {
        $now = now();
        foreach ($this->defaults as $row) {
            DB::table('service_categories')->updateOrInsert(
                ['key' => $row['key']],
                [
                    'name' => json_encode($row['name'], JSON_UNESCAPED_UNICODE),
                    'sort' => $row['sort'],
                    'updated_at' => $now,
                    'created_at' => $now,
                ],
            );
        }
    }

    private function backfillForeignKey(): void
    {
        $idsByKey = DB::table('service_categories')->pluck('id', 'key');
        foreach ($idsByKey as $key => $id) {
            DB::table('services')
                ->where('category', $key)
                ->update(['service_category_id' => $id]);
        }
    }

    private function restoreCategoryString(): void
    {
        $rows = DB::table('services')
            ->whereNotNull('service_category_id')
            ->join('service_categories', 'services.service_category_id', '=', 'service_categories.id')
            ->select('services.id', 'service_categories.key')
            ->get();

        foreach ($rows as $row) {
            DB::table('services')->where('id', $row->id)->update(['category' => $row->key]);
        }
    }
};
