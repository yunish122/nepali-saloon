<?php

use Illuminate\Support\Facades\Route;

require __DIR__.'/api/Shop.php';
require __DIR__.'/api/Service.php';
require __DIR__.'/api/QueueEntry.php';


Route::get('/test',function(){
    return response()->json([ 
        'message'=>'laravel connected'
    ]);
});