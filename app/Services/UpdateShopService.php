<?php
namespace App\Services;

use App\Http\Requests\UpdateShopRequest;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UpdateShopService{
    public function update_shop(Shop $shop,$data){

        DB::transaction(function () use($shop,$data){
            $shop->update($data);
        });
        return $shop;
    }
}