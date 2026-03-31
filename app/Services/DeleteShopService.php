<?php

namespace App\Services;

use App\Models\Shop;
use App\Models\User;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use Nette\Utils\Json;

//invarients:
//status pending queue must not be there for a shop to get deleted.

class DeleteShopService{
    public function deleteShop(Shop $shop):void{
        DB::transaction(function () use ($shop){
            $shop->delete();
        });
    }


    public function hardDeleteShop(Shop $shop):void{

        DB::transaction(function () use ($shop){
            $shop->forceDelete();
        });
    }
}