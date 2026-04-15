<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/discover-salons', [CustomerController::class, 'discoverSalons'])->name('discover-salons');
    Route::get('/shops/{shop}', [CustomerController::class, 'shopDetails'])->name('shops.details');
    Route::post('/shops/{shop}/join-queue', [CustomerController::class, 'joinQueue'])->name('shops.join-queue');
    Route::get('/my-queue', [CustomerController::class, 'myQueue'])->name('my-queue');
    Route::delete('/my-queue/{queueEntry}', [CustomerController::class, 'destroyQueueEntry'])->name('my-queue.destroy');
});

require __DIR__.'/auth.php';
