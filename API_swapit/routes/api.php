<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group(
    [
        'middleware' => 'api',
        'namespace'  => 'App\Http\Controllers',
        'prefix'     => 'auth',
    ],
    function ($router) {
        Route::post('login', 'AuthController@login');
        Route::post('register', 'AuthController@register');
        Route::post('logout', 'AuthController@logout');
        Route::get('profile', 'AuthController@profile');
        Route::post('resetPassword', 'AuthController@resetPassword');
        Route::post('changePassword', 'AuthController@changePassword');
        Route::post('refresh', 'AuthController@refresh');
    }
);


