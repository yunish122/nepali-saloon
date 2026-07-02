<?php

use App\Http\Controllers\ShopController;
use Illuminate\Support\Facades\Route;

Route::apiResource('shops', ShopController::class)->only('index', 'show');

Route::middleware(['auth:sanctum', 'role:owner'])->group(function () {
    Route::apiResource('shops', ShopController::class)->only('update', 'destroy', 'store');
});
