<?php

namespace App\Models;

use App\Enums\ShopStatus;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    protected $fillable = ['location', 'phone', 'openingTime', 'closingTime', 'status'];
    
    protected $casts = [
        'status' => ShopStatus::class,
        'openingTime' => 'datetime:H:i',
        'closingTime' => 'datetime:H:i',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
