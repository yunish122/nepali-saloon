<?php

namespace App\Models;

use App\Enums\DayOfWeekStatus;
use App\Enums\QueueEntryStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Queue;

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
        'status' => QueueEntryStatus::class,
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function queue_entry()  {
        return $this->belongsTo(Queue::class);
    }

    public function payment(){
        return $this->hasOne(QueueEntry::class);
    }
}
