<?php

use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::apiResource('services',ServiceController::class);
    });

    Route::middleware(['auth:sanctum','role:owner'])->group(function (){
        Route::apiResource('services',ServiceController::class)->only('store','destroy','update');
    });