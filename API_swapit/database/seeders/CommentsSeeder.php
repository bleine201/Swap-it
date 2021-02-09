<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comments;

class CommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Comments::create([
            'comment_author'=> '2',
            'comment_target' =>'3',
            'content' => 'Loving person',
            'ratings' => '5',
            'title' => 'Amazing',
        ]);

        Comments::create([
            'comment_author'=> '2',
            'comment_target' => '3',
            'content' => 'Test',
            'ratings' => '3',
            'title' => 'test',
        ]);

        Comments::create([
            'comment_author'=> '3',
            'comment_target' =>'2',
            'content' => 'Loving person',
            'ratings' => '5',
            'title' => 'Amazing',
        ]);

        Comments::create([
            'comment_author'=> '3',
            'comment_target' =>'2',
            'content' => 'hate person',
            'ratings' => '1',
            'title' => 'test',
        ]);
    }
}
