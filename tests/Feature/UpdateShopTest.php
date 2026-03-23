<?php

namespace Tests\Feature;

use App\Models\Shop;
use App\Models\User;
use Database\Seeders\Invarient\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
class UpdateShopTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */

    private User $owner;
    private User $customer;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(RoleSeeder::class);

        $this->owner = User::factory()->create();
        $this->owner->assignRole('owner');

        $this->customer = User::factory()->create();
        $this->customer->assignRole('customer');

    }


    public function test_happy_path() : void {
        
        $shop = Shop::factory()->create(['user_id'=>$this->owner->id,'shop_name'=>'shop1']);
        
        $this->actingAs($this->owner,'sanctum')->putJson(route('shops.update',$shop),['shop_name'=>'shop1'])->assertStatus(422);

    }

    //middleware test
    public function test_authentication():void{
        $shop = Shop::factory()->create(['user_id'=>$this->owner->id,'shop_name'=>'shop1']);
        $this->putJson(route('shops.update',$shop))->assertStatus(401);
    }

    
}
