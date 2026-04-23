<?php

namespace App\Models;

use App\Enums\QueueEntryStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QueueEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'queue_id',
        'shop_id',
        'service_id',
        'user_id',
        'status',
    ];

    protected $casts = [
        'status' => QueueEntryStatus::class,
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function queue()
    {
        return $this->belongsTo(Queue::class);
    }

    public function payment()
    {
        return $this->hasOne(QueueEntry::class);
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
