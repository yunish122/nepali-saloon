<?php

namespace Tests\Feature;

use App\Enums\QueueEntryStatus;
use App\Models\Queue;
use App\Models\QueueEntry;
use App\Models\Service;
use App\Models\Shop;
use App\Models\User;
use Database\Seeders\Invarient\RoleSeeder;
use Database\Seeders\QueueEntrySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DeleteQueueEntryTest extends TestCase
{
    use RefreshDatabase;
    private User $owner;
    private User $customer;


    protected function setUp():void{
        parent::setUp();

        $this->seed(RoleSeeder::class);

        $this->owner = User::factory()->create();
        $this->owner->assignRole('owner');

        $this->customer = User::factory()->create();
        $this->customer->assignRole('customer');

    }

    public function test_happy_path_deletion() : void {
        
        $shop = Shop::factory()->create();

        $serv = Service::factory()->create(['shop_id'=>$shop->id]);

        $queue = Queue::factory()->create(['shop_id'=>$shop->id]);

        $queueEntry = QueueEntry::factory()->create([
            'queue_id'=>$queue->id,
            'user_id'=>$this->customer->id,
            'service_id'=>$serv->id,
            'shop_id'=>$shop->id,
            'status'=>QueueEntryStatus::pending
        ]);

        $this->actingAs($this->customer,'web')->deleteJson("api/queue-entry/{$queueEntry->id}");
        $this->assertDatabaseHas('queue_entries',['status'=>QueueEntryStatus::cancelled]);
    }
    
    public function test_invalid_queue_entry_deletion_gets_blocked(){
        $shop = Shop::factory()->create();

        $serv = Service::factory()->create(['shop_id'=>$shop->id]);

        $queue = Queue::factory()->create(['shop_id'=>$shop->id]);

        $queueEntry = QueueEntry::factory()->create([
            'queue_id'=>$queue->id,
            'user_id'=>$this->customer->id,
            'service_id'=>$serv->id,
            'shop_id'=>$shop->id,
            'status'=>QueueEntryStatus::complete
        ]);

        $this->actingAs($this->customer,'web')->deleteJson("api/queue-entry/{$queueEntry->id}")->assertStatus(422);
    }
}
