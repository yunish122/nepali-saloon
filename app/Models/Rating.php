<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    /** @use HasFactory<\Database\Factories\RatingFactory> */
    use HasFactory;
    
    protected $fillable = [
        'rating',
        'description'
    ];
    
    protected $casts = [
        'rating' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
