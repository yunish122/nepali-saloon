<?php

namespace Tests\Feature;

use App\Models\Service;
use App\Models\Shop;
use App\Models\User;
use Database\Seeders\Invarient\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UpdateServiceTest extends TestCase
{
    private User $customer;
    private User $owner;
    private User $staff;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(RoleSeeder::class);

        $shop = Shop::factory()->create();
        $this->customer = User::factory()->create(["shop_id"=>$shop->id]);
        $this->customer->assignRole('customer');

        $this->owner = User::factory()->create(["shop_id"=>$shop->id]);
        $this->owner->assignRole('owner');
    }



    public function test_happy_path_update_service() :void {
        $serv = Service::factory()->create(["service_name"=>'Hair Cut',"shop_id"=>$this->owner->shop_id]);

        $this->actingAs($this->owner)->putJson(route("services.update",$serv),["service_name"=>"Facial"])->assertStatus(200);

        $this->assertDatabaseHas('services',["service_name"=>'Facial']);
    }

    
}
