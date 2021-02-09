<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'firstname' => 'Paris',
            'lastname' => 'Hilton',
            'username' => 'MissParis',
            'phone_number' => '0230203873',
            'email' => 'paris.hilton@hilton.com',
            'password' => 'thisisparis',
            'address' => '1 rue Los Angles',
            'postcode' => '75000',
            'city' => 'Los Angeles',
            'avg_ratings' => '7',
        ]);

        User::create([
            'firstname' => 'Keanu',
            'lastname' => 'Reeves',
            'username' => 'Breathtaking',
            'phone_number' => '023563873',
            'email' => 'keanu.reeves@rabbit.com',
            'password' => 'theone',
            'address' => '66 rue Matrix',
            'postcode' => '70000',
            'city' => 'Toronto',
            'avg_ratings' => '10',
        ]);

    }
}
