<?php

use App\Http\Controllers\CommentsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChatController;

use App\Http\Controllers\AdsController;
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

//chat message
Route::post('/getmessage', [ChatController::class , 'getMessage']);
Route::post('/sendmessage', [ChatController::class , 'SendMessage']);


//Users
Route::get('user', [UserController::class , 'index']);
Route::get('user/{id}', [UserController::class , 'show']);
Route::post('user', [UserController::class , 'store']);
Route::put('user/{id}', [UserController::class , 'update']);
Route::delete('user/{id}', [UserController::class , 'destroy']);

//Comments
Route::post('post_comment', [CommentsController::class , 'create']);//post as body
Route::get('get_one_comment', [CommentsController::class , 'getOne']);//use "comment_id" as params
Route::get('get_all_comment/{id}/{number}', [CommentsController::class , 'getAllById']);//id=> de l'utilisateur dont on veut recevoir les comments// number => pagination, default = 10

//Ad

Route::get('ads', [AdsController::class,'index']);
Route::post('ads', [AdsController::class,'store']);
Route::get('ads/{id}', [AdsController::class,'show']);
Route::put('ads/{id}', [AdsController::class,'update']);
Route::delete('ads/{id}', [AdsController::class,'destroy']);


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

