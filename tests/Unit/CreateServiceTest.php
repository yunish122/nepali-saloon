<?php

namespace Tests\Unit;

use App\Exceptions\DuplicateServiceException;
use App\Models\Service;
use App\Models\Shop;
use App\Models\User;
use App\Services\CreateServiceService;
use Database\Factories\ShopFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class CreateServiceTest extends TestCase
{
    use HasFactory;
    use RefreshDatabase;
    /**
     * A basic unit test example.
     */
    public function test_happy_path():void{

        $data = ['service_name'=>'Hair Cut','cost'=>200,'duration'=>60];
        $user = User::factory()->create();
        $shop = Shop::factory()->create(['user_id'=>$user->id]);

        $service = app(CreateServiceService::class);

        $servieIns = $service->execute($data,$shop);

        $this->assertDatabaseHas('services',['service_name'=>'Hair Cut']);
        $this->assertInstanceOf(Service::class,$servieIns);
    }

    public function test_no_duplicate_service_allowed():void{

        $user = User::factory()->create();
        $shop = Shop::factory()->create(['user_id'=>$user->id]);
        Service::factory()->create(['service_name'=>'Hair Cut','cost'=>200,'duration'=>60,'shop_id'=>$shop->id]);

        $data = ['service_name'=>'Hair Cut','cost'=>200,'duration'=>60,'user_id'=> $user->id];

        $service = app(CreateServiceService::class);
        $this->expectException(DuplicateServiceException::class);

        $service->execute($data,$shop);
        

    }
}
