<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// LARAVEL SANCTUM - API AUTHENTICATION
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// REGISTRO E LOGIN DE USUÁRIO
// ROTAS PUBLICAS - SEM AUTENTICAÇÃO
Route::post('signup', [AuthController::class, 'signup'])->name('signup');
Route::post('login', [AuthController::class, 'login'])->name('login');

// ROTAS PROTEGIDAS - AUTENTICADAS PELO MIDDLEWARE AUTH:API JWT
Route::group(['middleware' => 'auth:api'], function () {
    // USUÁRIO - ENDPOINTS
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);

    // TODO LIST - ENDPOINTS
    // Route::get('todo', [AuthController::class, 'index']);
    // Route::post('todo', [AuthController::class, 'store']);
    // Route::get('todo/{id}', [AuthController::class, 'show']);
    // Route::put('todo/{id}', [AuthController::class, 'update']);
    // Route::delete('todo/{id}', [AuthController::class, 'destroy']);
    // TODO LIST - ENDPOINTS
});

