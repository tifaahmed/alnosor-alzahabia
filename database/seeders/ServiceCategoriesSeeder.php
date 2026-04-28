<?php

namespace Database\Seeders;

use App\Models\ServiceCategory;
use Illuminate\Database\Seeder;

class ServiceCategoriesSeeder extends Seeder
{
    /**
     * @var array<int, array{key:string,name:array{ar:string,en:string},sort:int}>
     */
    private array $categories = [
        ['key' => 'maintenance', 'name' => ['ar' => 'الصيانة العامة', 'en' => 'General Maintenance'], 'sort' => 1],
        ['key' => 'finishing', 'name' => ['ar' => 'أعمال التشطيبات والبناء', 'en' => 'Finishing & Construction'], 'sort' => 2],
        ['key' => 'mep', 'name' => ['ar' => 'السباكة والكهرباء', 'en' => 'Plumbing & Electrical'], 'sort' => 3],
        ['key' => 'woodwork', 'name' => ['ar' => 'النجارة والحدادة', 'en' => 'Carpentry & Ironwork'], 'sort' => 4],
        ['key' => 'exterior', 'name' => ['ar' => 'الأعمال الخارجية', 'en' => 'External Works'], 'sort' => 5],
        ['key' => 'renovation', 'name' => ['ar' => 'التكسير والتجديد', 'en' => 'Demolition & Renovation'], 'sort' => 6],
    ];

    public function run(): void
    {
        foreach ($this->categories as $row) {
            ServiceCategory::updateOrCreate(
                ['key' => $row['key']],
                ['name' => $row['name'], 'sort' => $row['sort']],
            );
        }
    }
}
