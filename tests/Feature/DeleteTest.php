<?php

namespace Tests\Feature;

use App\Models\Shop;
use App\Models\User;
use Database\Seeders\Invarient\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Testing\Concerns\AssertsStatusCodes;


class DeleteTest extends TestCase
{
    use RefreshDatabase;
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
    /**
     * happy path
     */
    public function test_happy_path_delete(){
        $shop = Shop::factory()->create(['user_id'=> $this->owner->id]);
        Shop::factory()->create();
        $this->actingAs($this->owner,'sanctum')->deleteJson(route('shops.destroy',$shop))->assertNoContent();
        $this->assertSoftDeleted('shops',['id'=>$shop->id]);
    }

    //authentication

    public function test_authenticated_user_can_delete():void{
        $shop = Shop::factory()->create(['user_id'=> $this->owner->id]);
        Shop::factory()->create();
        $this->deleteJson(route('shops.destroy',$shop))->assertStatus(401);
    }
    //authorization
    public function test_unauthorized_user_can_delete(){
        $shop = Shop::factory()->create(['user_id'=> $this->owner->id]);
        Shop::factory()->create();
        $this->actingAs($this->customer,'sanctum')->deleteJson(route('shops.destroy',$shop))->assertForbidden();
    }
    //poilcy check
    public function test_policy_level_authorization():void{
        $anotherOwner = User::factory()->create();
        $anotherOwner->assignRole('owner');
        
        $shop = Shop::factory()->create(['id'=>$anotherOwner->id]);

        $this->actingAs($anotherOwner,'sanctum')->deleteJson(route('shops.destroy',$shop))->assertForbidden();


    }
}
