<?php

namespace Tests\Feature;

use App\Models\Queue;
use App\Models\QueueEntry;
use App\Models\Service;
use App\Models\Shop;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Database\Seeders\Invarient\RoleSeeder;

class CreateQueueEntryTest extends TestCase
{
    
    use RefreshDatabase;

    private User $owner;
    private User $customer;
    private User $staff;
    public function setUp(): void
    {
        parent::setUp();
        $this->seed(RoleSeeder::class);

        $this->owner = User::factory()->create();
        $this->owner->assignRole('owner');

        $this->staff = User::factory()->create();
        $this->staff->assignRole('staff');
        
        $this->customer = User::factory()->create();
        $this->customer->assignRole('customer');
    }
    /**
     * A basic feature test example.
     */
    public function test_happy_path_queue_entry()  {
    
        $shop = Shop::factory()->create();

        $serv = Service::factory()->create(['shop_id'=>$shop->id]);

        $queue = Queue::factory()->create(['shop_id'=>$shop->id]);

        $queueData = QueueEntry::factory()->make([
            'queue_id'=>$queue->id,
            'user_id'=>$this->customer->id,
            'service_id'=>$serv->id,
            'shop_id'=>$shop->id
        ])->toArray();

        $this->actingAs($this->customer)->postJson('api/queue-entry',$queueData);
        $this->assertDatabaseCount('queue_entries',1);

    }

    public function test_duplicate_queue_entry_within_same_service()  {
    
        $shop = Shop::factory()->create();

        $serv = Service::factory()->create(['shop_id'=>$shop->id]);

        $queue = Queue::factory()->create(['shop_id'=>$shop->id]);

        QueueEntry::factory()->create([
            'queue_id'=>$queue->id,
            'user_id'=>$this->customer->id,
            'service_id'=>$serv->id,
            'shop_id'=>$shop->id
        ]);
        
        $queueEntry = QueueEntry::factory()->make([
            'queue_id'=>$queue->id,
            'user_id'=>$this->customer->id,
            'service_id'=>$serv->id,
            'shop_id'=>$shop->id
        ])->toArray();

        $this->actingAs($this->customer)->postJson('api/queue-entry',$queueEntry);
    
        $this->assertDatabaseCount('queue_entries',1);
    }
}
