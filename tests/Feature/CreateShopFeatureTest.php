<?php

namespace Tests\Feature;

use App\Models\Shop;
use App\Models\User;
use Database\Seeders\Invarient\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Concerns\AssertsStatusCodes;
use Tests\TestCase;

class CreateShopFeatureTest extends TestCase
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
    /**
     * unauthenticated
     */
    public function test_unauthenticated_user_cant_create_shop() : void {

        $data = Shop::factory()->make()->toArray();
        $this->postJson('/api/shops',$data)->assertStatus(401);

    }

    // //only correct role can do authoried shop
    public function test_unauthorized_user_cant_create_shop() : void {
        
        $data = Shop::factory()->make(['default_duration'=>30])->toArray();

        $this->actingAs($this->customer,'sanctum')->postJson('/api/shops',$data)->assertForbidden();


    }

    // //policy check
    // public function test_invalid_role_create_shop() : void {
    //     $data = Shop::factory()->make(['default_duration'=>30])->toArray();

    //     $this->actingAs($this->customer,'sanctum')->postJson('/api/shops',$data)->assertForbidden();

    // }

    //validation check
    public function test_if_invalid_data_goes_through() : void {
        Shop::factory()->create(['shop_name'=>'shop1']);
        $data = Shop::factory()->make(['shop_name'=>'shop1','default_duration'=>30])->toArray();

        $this->actingAs($this->owner,'sanctum')->postJson('/api/shops',$data)->assertStatus(422);
    }

    //invarient check
    public function test_shop_cant_be_created_more_than_thirce() : void {
        Shop::factory(3)->create(['user_id'=>$this->owner->id]);

        $data = Shop::factory()->make(['shop_name'=>'shop1','default_duration'=>30])->toArray();

        $this->actingAs($this->owner,'sanctum')->postJson('/api/shops',$data)->assertStatus(422);
    }
    //happy test
    public function test_owner_can_create_shop() :void {
        $data = Shop::factory()->make(['default_duration'=>30,'opening_time' => '09:00:00','closing_time' => '18:00:00'])->toArray();

        $this->actingAs($this->owner,'sanctum')->postJson('/api/shops',$data)->assertCreated();

        $this->assertDatabaseCount('shops',1);
        $this->assertDatabaseCount('queues',1);

    }
}
