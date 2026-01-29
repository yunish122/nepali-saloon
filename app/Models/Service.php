<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceFactory> */
    use HasFactory;
    
    protected $fillable = [
        'cost',
        'service_name',
        'duration'
    ];
    
    protected $casts = [
        'cost' => 'decimal:2',
        'duration' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    
    public function shop(){
        return $this->belongsTo(Shop::class);
    }
}
