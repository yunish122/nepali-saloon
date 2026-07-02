<?php

namespace Database\Factories;

use App\Enums\QueueEntryStatus;
use App\Enums\QueueStatus;
use App\Models\Queue;
use App\Models\Service;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\QueueEntry>
 */
class QueueEntryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // 'shop_id'=>Shop::factory(),
            // 'queue_id'=>Queue::factory(),
            'service_id'=>Service::factory(),
            'user_id'=>User::factory(),
            'status'=>QueueEntryStatus::pending
        ];
    }
}
