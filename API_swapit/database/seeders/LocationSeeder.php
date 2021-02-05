<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        Location::create([
            'city' => 'Paris',
            'latitude' => '48.862725',
            'longitude' => '2.287592',
        ]);

        Location::create([
            'city' => 'Toulouse',
            'latitude' => '43.6044622',
            'longitude' => '1.4442469',
        ]);

        Location::create([
            'city' => 'Nice',
            'latitude' => '43.7009358',
            'longitude' => '7.2683912',
        ]);

        Location::create([
            'city' => 'Marseille',
            'latitude' => '43.2961743',
            'longitude' => '5.3699525',
        ]);

        Location::create([
            'city' => 'Lyon',
            'latitude' => '45.7578137',
            'longitude' => '4.8320114',
        ]);
    }
}
