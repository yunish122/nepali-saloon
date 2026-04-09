<?php

namespace App\Services;

use App\Models\Service;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\RedirectResponse;

class DeleteServiceService{

    public function softDelete(Service $service){
        DB::transaction(function () use ($service){
            $service->delete();
        });
    }

}