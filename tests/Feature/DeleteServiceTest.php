<?php

namespace Tests\Feature;

use App\Models\Service;
use App\Models\Shop;
use App\Models\User;
use Database\Seeders\Invarient\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PhpOption\Some;
use Serializable;
use Tests\TestCase;

class DeleteServiceTest extends TestCase
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
    //happy path test
    public function test_happy_path_delete_service(){

        $service = Service::factory()->create();
        $this->actingAs($this->owner,'web')->deleteJson("/api/services/{$service->id}")->assertStatus(200);
    }

    //unaouthrized owner tries to delete

    public function test_unauthorized_user_cannot_delete_service(){
        //arrange
        $shop = Shop::factory()->create();
        $user = Shop::factory()->create();
        $service = Service::factory()->create(['shop_id'=>$shop->id,"user_id"=>$user->id]);
        // dd("{$user->id} askjfa {$shop->id}");
        $unAuthUser = User::factory()->create();
        $this->actingAs($unAuthUser,'web')->deleteJson("/api/services/{$service->id}")->assertStatus(403);
    }

    public function test_unauthenticated_user_cannot_delete_service(){
        $shop = Shop::factory()->create();
        $user = Shop::factory()->create();
        $service = Service::factory()->create(['shop_id'=>$shop->id,"user_id"=>$user->id]);
        // dd("{$user->id} askjfa {$shop->id}");
        $unAuthUser = User::factory()->create();
        $this->deleteJson("/api/services/{$service->id}")->assertStatus(401);
    }
}
