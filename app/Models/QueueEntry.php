<?php

namespace App\Models;

use App\Enums\DayOfWeekStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QueueEntry extends Model
{
    /** @use HasFactory<\Database\Factories\QueueEntryFactory> */
    use HasFactory;
    protected $fillable = [
        'day',
        'default_duration',
        'service_id'
    ];
    protected $casts = [
        'day' => DayOfWeekStatus::class,
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
