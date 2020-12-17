<?php

use App\Http\Controllers\API\BlogController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;

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

if (App::environment('production')) {
    URL::forceScheme('https');
}

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('users', [UserController::class, "index"]);

    Route::put('blogs/{blog}', [BlogController::class, 'update']);
    Route::post('blogs', [BlogController::class, 'store']);
    Route::delete('blogs/{blog}', [BlogController::class, 'destroy']);
    
});

Route::get('blogs', [BlogController::class, 'index']);
Route::get('blogs/{blog}', [BlogController::class, 'show']);

Route::post("login", [UserController::class, 'login']);
Route::post("logout", [UserController::class, 'logout']);
