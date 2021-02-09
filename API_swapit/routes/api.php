<?php

use App\Http\Controllers\CommentsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChatController;

use App\Http\Controllers\AdsController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\LocationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/




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
Route::middleware('authenticated')->post('/getmessage', [ChatController::class , 'getMessage']); 
Route::middleware('authenticated')->post('/sendmessage', [ChatController::class , 'SendMessage']); 
Route::middleware('authenticated')->post('/AuthenticatedUser', [ChatController::class , 'AuthenticatedUser']);


//Users
Route::middleware('authenticated')->get('user', [UserController::class , 'index']); 
Route::middleware('authenticated')->get('user/{id}', [UserController::class , 'show']); 
Route::middleware('authenticated')->post('user', [UserController::class , 'store']); 
Route::middleware('authenticated')->put('user/{id}', [UserController::class , 'update']); 
Route::middleware('authenticated')->delete('user/{id}', [UserController::class , 'destroy']); 

//Comments
Route::middleware('authenticated')->post('post_comment', [CommentsController::class , 'create']);//post as body
Route::get('get_one_comment', [CommentsController::class , 'getOne']);//use "comment_id" as params
Route::get('get_all_comment/{id}/{number}', [CommentsController::class , 'getAllById']);//id=> de l'utilisateur dont on veut recevoir les comments// number => pagination, default = 10
/*                      ADMIN ROUTE:        */
Route::middleware('authenticated')->put('update_one_comment', [CommentsController::class , 'updateOne']);// use "comment_id" to identfy comment as params. Send everything as params, content to send is the same as "create" route.
Route::middleware('authenticated')->delete('delete_one_comment', [CommentsController::class , 'deleteOne']);// use "comment_id" to identfy comment as params

//Get all location
Route::get('/location', [LocationController::class, 'cities']);
//Post location
Route::middleware('authenticated')->post('/location', [LocationController::class, 'locations']);


//Get all images
Route::middleware('authenticated')->get('/images', [ImageController::class, 'images']);
//Upload image
Route::middleware('authenticated')->post('/upload', [ ImageController::class, 'upload' ]);
//Get image by ad id
Route::middleware('authenticated')->get('/images/{id}', [ImageController::class, 'post']);
//Delete image
Route::middleware('authenticated')->delete('images/{id}', [ImageController::class, 'delete']);
//Update image
Route::middleware('authenticated')->put('images/{id}', [ImageController::class, 'update']);

// Get all Categories
Route::get('ads/category', [AdsController::class,'categories']);
// Route filter by category
Route::get('ads/category/{id}', [AdsController::class,'CatById']);

// Get all Conditions
Route::get('ads/condition', [AdsController::class,'conditions']);
// ROute filter by condition
Route::get('ads/condition/{id}', [AdsController::class,'CondById']);

//Ad
Route::get('ads', [AdsController::class,'index']);
Route::middleware('authenticated')->post('ads', [AdsController::class,'store']);
Route::middleware('authenticated')->get('ads/{id}', [AdsController::class,'show']);
Route::middleware('authenticated')->put('ads/{id}', [AdsController::class,'update']);
Route::middleware('authenticated')->delete('ads/{id}', [AdsController::class,'destroy']);


//Search ad by title
Route::get('/search/{name}', [AdsController::class, 'search']);

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });



