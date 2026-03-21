<?php

namespace App\Services;

use App\Enums\DayOfWeekStatus;
use App\Enums\QueueStatus;
use App\Enums\ShopStatus;
use App\Exceptions\NoMoreThanThreeShopException;
use App\Models\Queue;
use App\Models\Shop;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class CreateShopService{
    public function createShop(User $user, $data){
        //invarient 1 owner must not have more than 3 shop
        if($user->shop()->count() >= 3){
            throw NoMoreThanThreeShopException::noMoreThanThreeShop($user->id);
        }

        //atomicity
        DB::transaction(function () use($data,$user){
            $shop = Shop::create([
                'shop_name'=>$data['shop_name'],
                'location' => $data['location'],
                'phone' => $data['phone'],
                'status' => ShopStatus::open,
                'user_id' => $user->id,
                'opening_time'=>$data['opening_time'],
                'closing_time'=>$data['closing_time']
            ]);

            Queue::create([
                'day'=> DayOfWeekStatus::from(Carbon::now()->dayOfWeek()+1),
                'default_duration'=> $data['default_duration'],
                'status'=>QueueStatus::open,
                'shop_id'=> $shop->id
            ]); 
        });

    }    
}
