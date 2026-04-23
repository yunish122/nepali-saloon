<?php

namespace App\Services;

use App\Enums\QueueEntryStatus;
use App\Exceptions\DuplicateQueueEntryException;
use App\Models\Queue;
use App\Models\QueueEntry;
use App\Models\Service;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CreateQueueEntryService
{
    public function execute(Queue $q, User $user, Shop $shop, Service $service)
    {

        $exist = $shop->queueEntry()
            ->where('queue_id', $q->id)
            ->where('user_id', $user->id)
            ->where('status', QueueEntryStatus::pending)
            ->exists();

        if ($exist) {
            throw DuplicateQueueEntryException::duplicateQueueEntryException();
        }

        return DB::transaction(function () use ($q, $user, $shop, $service) {
            return QueueEntry::create([
                'queue_id' => $q->id,
                'shop_id' => $shop->id,
                'user_id' => $user->id,
                'status' => QueueEntryStatus::pending,
                'service_id' => $service->id,
            ]
            );

        });

    }
}
