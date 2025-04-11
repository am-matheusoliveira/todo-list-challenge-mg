<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;

// Endpoints públicos usados pelo frontend para registrar, autenticar e revogar o token do usuário
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('signup', [AuthController::class, 'signup'])->name('signup');
Route::post('logout', [AuthController::class, 'logout'])->name('logout');

// Renova o token JWT expirado, mantendo o usuário autenticado
Route::post('refresh', [AuthController::class, 'refresh'])->name('refresh');

// Rotas acessíveis apenas por usuários autenticados via JWT (auth:api)
Route::group(['middleware' => 'auth:api'], function () {
    // Endpoints relacionados ao usuário autenticado    
    Route::get('me', [AuthController::class, 'me'])->name('me');
    
    // Endpoints relacionados às tarefas
    Route::apiResource('tasks', TaskController::class);
});