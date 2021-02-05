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
            'state' => 'New',
        ]);

        Condition::create([
            'state' => 'Good',
        ]);

        Condition::create([
            'state' => 'Ok',
        ]);
        Condition::create([
            'state' => 'Bad',
        ]);
    }
}
