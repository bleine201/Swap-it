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
            $table->timestamps();
           // $table->foreignId('user_id');
            //$table->foreignId('category_id');
          //  $table->foreignId('image_id');
           // $table->foreignId('exchange_id');
            //$table->foreignId('username');
            //$table->foreignId('location');
           // $table->foreignId('product_condition');
           // $table->foreign('user_id')->references('id')->on('users');
            //$table->foreign('category_id')->references('id')->on('categories');
           // $table->foreign('image_id')->references('id')->on('images');
          //  $table->foreign('exchange_id')->references('id')->on('exchanges');
           // $table->foreign('username')->references('username')->on('users');
           // $table->foreign('location')->references('address')->on('users');
            //$table->foreign('product_condition')->references('condition')->on('product_condition');
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
