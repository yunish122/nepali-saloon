<?php
namespace App\Services;

use App\Http\Requests\UpdateShopRequest;
use App\Models\Service;
use Illuminate\Support\Facades\DB;

class UpdateServiceService{
    public function update_service(Service $service,$data){

        DB::transaction(function () use($service,$data){
            $service->update($data);
        });
        return $service;
    }
}