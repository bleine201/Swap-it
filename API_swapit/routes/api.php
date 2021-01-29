<?php

use App\Http\Controllers\CommentsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;


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

Route::resource('users', 'UserController');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('post_comment', [CommentsController::class , 'create']);//post as body
Route::get('get_one_comment', [CommentsController::class , 'getOne']);//use "comment_id" as params
Route::get('get_all_comment/{id}/{number}', [CommentsController::class , 'getAllById']);//id=> de l'utilisateur dont on veut recevoir les comments// number => pagination, default = 10