<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exchange;

class ExchangeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Exchange::create([
            'type' => 'PS4',
        ]);
        Exchange::create([
            'type' => 'Childish Gambino - Camps',
        ]);
        Exchange::create([
            'type' => 'Iphone 10',
        ]);
    }
}
