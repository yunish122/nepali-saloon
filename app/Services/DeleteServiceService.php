<?php

namespace App\Services;

use App\Models\Service;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use Nette\Utils\Json;

//invarients:
//status pending queue must not be there for a shop to get deleted.

class DeleteServiceService{

    public function execute(Service $service):void{
        DB::transaction(function ()use ($service){
            $service->delete();
        });
    }

    public function hardDelete(Service $service):void{
        DB::transaction(function ()use ($service) {
            $service->forceDelete();
        });
    }

}