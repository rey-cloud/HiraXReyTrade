<?php

use App\Http\Controllers\PetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/pets', [PetController::class, 'store']);
Route::get('/pets/{id}', [PetController::class, 'show']);