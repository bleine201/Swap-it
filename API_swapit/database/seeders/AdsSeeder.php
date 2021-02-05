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
        
        Ad::create([
            'title' => 'Childish Gambino: Because the internet',
            'description' => 'The second album of Childish Gambino',
            'user_id' => '1',
            'category_id' => '4',
            'condition_id' => '2',
            'exchange_id' => '2',
            'username' => 'MissParis',
            'address' => '1 rue Los Angles',
        ]);

        Ad::create([
            'title' => 'PS5',
            'description' => 'The last console from Sony',
            'user_id' => '2',
            'category_id' => '3',
            'condition_id' => '3',
            'exchange_id' => '1',
            'username' => 'Breathtaking',
            'address' => '66 rue Matrix',
        ]);

        Ad::create([
            'title' => 'IPhone 11',
            'description' => 'The lastest phone from Appel',
            'user_id' => '1',
            'category_id' => '2',
            'condition_id' => '1',
            'exchange_id' => '3',
            'username' => 'MissParis',
            'address' => '1 rue Los Angles',
        ]);
    }
}
