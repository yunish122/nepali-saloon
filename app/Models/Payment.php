<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\PaymentStatus;
class Payment extends Model
{
    /** @use HasFactory<\Database\Factories\PaymentFactory> */
    use HasFactory;
    protected $fillable = [
        'status'
    ];
    protected $casts = ['status'=>PaymentStatus::class];
}
