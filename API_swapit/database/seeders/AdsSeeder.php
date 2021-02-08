<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ad;

class AdsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Ad::create([
            'title' => 'PS5',
            'description' => 'a Brand new PS5, the lastest Sony product. I brought last Christmas',
            'category_id' => '2',
            'condition_id' => '1',
        ]);

        Ad::create([
            'title' => 'South Park T-Shirt',
            'description' => 'A T-shirt of the unfamous cartoon tv-show from Central Comedy',
            'category_id' => '4',
            'condition_id' => '3',
        ]);

        Ad::create([
            'title' => 'Childish Gambino: Because the internet',
            'description' => 'The second album of Childish Gambino',
            'category_id' => '2',
            'condition_id' => '4',
        ]);

       
    }
}
