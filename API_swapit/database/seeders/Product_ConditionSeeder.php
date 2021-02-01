<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Condition;


class Product_ConditionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Condition::create([
            'name' => 'New',
        ]);

        Condition::create([
            'name' => 'Good',
        ]);

        Condition::create([
            'name' => 'Ok',
        ]);
        Condition::create([
            'name' => 'Bad',
        ]);
    }
}
