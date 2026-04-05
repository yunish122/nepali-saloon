<?php

namespace Tests\Feature;

use App\Models\Service;
use App\Models\Shop;
use App\Models\User;
use Database\Seeders\Invarient\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Serializable;
use Tests\TestCase;

class CreateServiceFeatureTest extends TestCase
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

    public function test_happy_path_feature(): void
    {
        $shop = Shop::factory()->create();
        $data = Service::factory()->make(['shop_id'=>$shop->id,'user_id'=> $this->staff->id])->toArray();

        $this->actingAs($this->owner,'sanctum')->postJson('/api/services',$data)->assertStatus(201);
    }

    public function test_unauthentication() : void {
        $shop = Shop::factory()->create();
        $data = Service::factory()->make(['shop_id'=>$shop->id,'user_id'=> $this->staff->id])->toArray();

        $this->postJson('/api/services',$data)->assertStatus(401);

    }

    public function test_unauthorized_access():void{
        $shop = Shop::factory()->create();
        $data = Service::factory()->make(['shop_id'=>$shop->id,'user_id'=> $this->staff->id])->toArray();

        $this->actingAs($this->customer,'sanctum')->postJson('/api/services',$data)->assertStatus(403);

    }

    public function test_validation():void{
        $shop = Shop::factory()->create();
        $data = Service::factory()->make(['shop_id'=>$shop->id,'user_id'=> $this->staff->id])->toArray();

        $this->actingAs($this->customer,'sanctum')->postJson('/api/services',$data)->assertStatus(403);

    }

    public function test_duplicate_service_name_forbidden(): void{
        $shop = Shop::factory()->create();
        Service::factory()->create(['shop_id'=>$shop->id,'service_name'=>'Hair Cut','cost'=>40,'duration'=>60,'user_id'=>$this->owner->id]);

        $data = Service::factory()->make(['shop_id'=>$shop->id,'service_name'=>'Hair Cut','cost'=>40,'duration'=>60,'user_id'=>$this->owner->id])->toArray();
        $this->actingAs($this->owner,'sanctum')->postJson('/api/services',$data)->assertStatus(422);

    }

    public function test_invalid_shop_owner_creating_service():void{
        $shop = Shop::factory()->create(['user_id'=>$this->owner->id]);
        $owner1 = User::factory()->create();

        $owner1->assignRole('owner');

        $data = Service::factory()->make(['shop_id'=>$shop->id,'service_name'=>'Hair Cut','cost'=>40,'duration'=>60,'user_id'=>$owner1->id])->toArray();
        $this->actingAs($owner1,'sanctum')->postJson('/api/services',$data)->assertForbidden();

    }
}
