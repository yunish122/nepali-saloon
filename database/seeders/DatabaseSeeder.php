<?php

namespace Database\Seeders;

use App\Models\Queue;
use App\Models\QueueEntry;
use App\Models\Service;
use App\Models\Shop;
use App\Models\User;
use Database\Seeders\Invarient\RoleSeeder as InvarientRoleSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\Invarient\RoleSeeder;
use Database\Seeders\Invarient\PermissionSeeders;
use Database\Seeders\RolesPermissionSeeders;
use Spatie\Permission\Commands\AssignRole;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // User::factory(10)->create();
        $this->call([
            RoleSeeder::class,
            PermissionSeeders::class,
            RolesPermissionSeeders::class
        ]);
    //user seeded
        $owner = User::factory()->create([
            'name' => 'Owner User',
            'email' => 'owner@test.com',
            'password' => 'owner@123'
        ]);

        $owner->assignRole('owner');
        $customer = User::factory()->create([
            'name' => 'Customer User',
            'email' => 'customer@test.com',
            'password' => 'cust@123'
        ]);
        $customer->assignRole("customer");


        //shop seed
        $shop = Shop::factory()->create(
            [
                'user_id'=>$owner->id
            ]
        );

        $services = Service::factory()->count(5)->create([
            'shop_id' => $shop->id,
            'user_id' => $owner->id,
        ]);

        $queue = Queue::factory()->create([
            'shop_id' => $shop->id
        ]);

        foreach($services as $serv){
            QueueEntry::factory()->create([
                'queue_id'=>$queue->id,
                'shop_id' => $shop->id,
                'service_id'=>$serv->id
            ]);            
        }

    }
}
