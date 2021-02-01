<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        Category::create([
            'name' => 'High-Tech',
        ]);

        Category::create([
            'name' => 'Furniture',
        ]);

        Category::create([
            'name' => 'Clothes',
        ]);

        Category::create([
            'name' => 'Art',
        ]);

        Category::create([
            'name' => 'Music',
        ]);

    }
}
