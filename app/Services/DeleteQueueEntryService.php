<?php

namespace App\Services;

use App\Enums\QueueEntryStatus;
use App\Exceptions\CancelledQueueEntryDelete;
use App\Exceptions\InvalidQueueEntry;
use App\Models\QueueEntry;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DeleteQueueEntryService{
    public function execute(QueueEntry $queueEntry){
        if($queueEntry->status !== QueueEntryStatus::pending){
            throw InvalidQueueEntry::invalidQueueEntryDelete();
        };
        $queueEntry->update([
            'status'=>QueueEntryStatus::cancelled
        ]);

    }
}