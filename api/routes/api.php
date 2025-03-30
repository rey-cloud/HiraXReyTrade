<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/pets/{id}/getValue', [PetController::class, 'getValue']);
Route::post('/pets', [PetController::class, 'store']);
Route::get('/pets', [PetController::class, 'index']);
Route::get('/pets/{id}', [PetController::class, 'show']);
Route::put('/pets/{id}', [PetController::class, 'update']);
Route::delete('/pets/{id}/delete', [PetController::class, 'destroy']);



//users
Route::apiResource('users', UserController::class);