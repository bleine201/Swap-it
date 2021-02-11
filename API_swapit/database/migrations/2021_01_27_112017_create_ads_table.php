<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ads', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->mediumText('description');
            $table->foreignId('user_id')->constrained();
            $table->foreignId('exchange_id')->constrained();
            $table->foreignId('condition_id')->constrained();
            $table->foreignId('category_id')->constrained();
            $table->string('pseudo'); // A REVOIR CAAAAA
            $table->foreign('pseudo')->references('username')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ads');
    }
}
