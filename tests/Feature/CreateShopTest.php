<?php

namespace Tests\Feature;

use App\Enums\DayOfWeekStatus;
use App\Enums\QueueStatus;
use App\Exceptions\NoMoreThanThreeShopException;
use App\Models\Queue;
use App\Models\Shop;
use App\Models\User;
use App\Services\CreateShopService;
use Carbon\Carbon;
use Database\Seeders\Invarient\PermissionSeeders;
use Database\Seeders\Invarient\RoleSeeder;
use Database\Seeders\RolesPermissionSeeders;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class CreateShopTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */

    //happy test
    public function test_user_can_create_shop_and_queue(): void
    {

    //arrange
    $user = User::factory()->create();

    $shop = Shop::factory()->make([
        'user_id' => $user->id,
        'default_duration' => fake()->numberBetween(20,40) //everything except default duration is set by default and data were passing is only shop so we are overriding it
    ])->toArray();

    //act
    $service = app(CreateShopService::class);

    $service->createShop($user, $shop);

    //assert

    $this->assertDatabaseCount('shops',1);
    $this->assertDatabaseCount('queues',1);


    }
    //one test for one invarient
    public function test_user_with_more_than_three_shop_create():void{

        //arrange
        $user = User::factory()->create();
        
        Shop::factory(3)->create([
            'user_id' => $user->id
        ]);
        $shop = Shop::factory()->make(
            [
                'user_id' => $user->id,
                'default_duration'=> fake()->numberBetween(20,60)
            ]
        )->toArray();

        //assert
        $this->expectException(NoMoreThanThreeShopException::class);

        //act
        $service = app(CreateShopService::class);
        $service->createShop($user,$shop);


    }

    //atomicty
    public function test_check_database_for_spilled_data():void{
        $user = User::factory()->create();

        Shop::factory(3)->create([
            'user_id'=> $user->id,
        ]);
        
        $shop = Shop::factory()->make(
            [
                'user_id' => $user->id,
                'default_duration'=> fake()->numberBetween(20,60)
            ]
        )->toArray();

        try{
            $service = app(CreateShopService::class);
            $service->createShop($user,$shop);
        }catch(NoMoreThanThreeShopException $e){
            
        }
        //assert count

        $this->assertDatabaseCount('shops',3);
        $this->assertDatabaseCount('queues',0);

    }
}
//problem for tomorrow: queue ko lai data chairaxa butt claude le chaidaina bhaniraxa
