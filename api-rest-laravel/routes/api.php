<?php

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


// Rutas de controlador de usuario
Route::post('/register', 'UserController@register');
Route::post('/login', 'UserController@login');
Route::put('/users/update', 'UserController@update')->name('users.update')->middleware('api.auth');
Route::post('/users/upload', 'UserController@upload')->name('users.upload')->middleware('api.auth');
Route::get('users/avatar/{filename}', 'UserController@getImage')->name('users.avatar');
Route::get('users/{id}', 'UserController@detail')->name('users.detail')->middleware('api.auth');

//Rutas de Categorias
Route::apiResource('/category', 'CategoryController');

// Rutas de Posts
Route::apiResource('/posts', 'PostController');
Route::post('/posts/image', 'PostController@upload')->name('posts.image');
Route::get('/posts/image/{filename}', 'PostController@getImage')->name('posts.getImage');