<?php

use Illuminate\Support\Facades\Route;

    Route::get('/abc', function (){
        return response()->json(
            [
                'message'=>"reached"
            ]
        );
    });
    
?>