<?php

namespace App\Models;

use App\Enums\ShopStatus;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Queue;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shop extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['location', 'phone', 'opening_time', 'closing_time', 'status','shop_name','user_id'];
    
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
