<?php

namespace App\Models;

use App\Enums\QueueStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\DayOfWeekStatus;

class Queue extends Model
{
    /** @use HasFactory<\Database\Factories\QueueFactory> */
    use HasFactory;

    protected $fillable = [
        'default_duration',
        'day',
        'status'
    ];
    protected $casts = ['status'=>QueueStatus::class,'day'=>DayOfWeekStatus::class,'default_duration'=>'integer'];
}
