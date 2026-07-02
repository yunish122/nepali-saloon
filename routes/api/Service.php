<?php

use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;

Route::apiResource('services', ServiceController::class)->only('index', 'show', 'store', 'destroy','update',);

// Route::middleware(['auth:sanctum'])->group(function () {
//     Route::apiResource('services',ServiceController::class)->only( );
// });

