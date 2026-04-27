<?php

use App\Http\Controllers\QueueEntryController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:web'])->group(function () {
    Route::apiResource('queue-entry',QueueEntryController::class);
});

