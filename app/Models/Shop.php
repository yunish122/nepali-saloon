<?php

namespace App\Models;

use App\Enums\ShopStatus;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Queue;
use App\Models\Service;


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

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function queue(){
        return $this->hasOne(Queue::class);
    }

    public function service(){
        return $this->hasMany(Service::class);
    }

    public function rating(){
        return $this->hasMany(Rating::class);
    }
}
