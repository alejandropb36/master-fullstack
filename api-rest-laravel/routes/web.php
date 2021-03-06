<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return view('welcome');
});

// Rutas de prueba
Route::get('/pruebas/{name?}', function($name = '') {
    $texto = 'Hola ' . $name;
    return $texto;
});
Route::get('/test-orm', 'PruebasController@testOrm');
Route::get('/usuario/pruebas', 'UserController@pruebas');
Route::get('/categoria/pruebas', 'CategoryController@pruebas');
Route::get('/post/pruebas', 'PostController@pruebas');
