<?php

namespace App\Models;

use App\Enums\QueueEntryStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QueueEntry extends Model
{
    /** @use HasFactory<\Database\Factories\QueueEntryFactory> */
    use HasFactory;

    protected $fillable = [
        'service_id',
        'status',
        'user_id',
    ];

    protected $casts = [
        'status' => QueueEntryStatus::class,
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function queue_entry()
    {
        return $this->belongsTo(Queue::class);
    }

    public function queue()
    {
        return $this->belongsTo(Queue::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
