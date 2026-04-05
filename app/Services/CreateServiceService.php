<?php

namespace App\Services;

use App\Exceptions\DuplicateServiceException;
use App\Models\Service;
use App\Models\Shop;
use Illuminate\Support\Facades\DB;

class CreateServiceService
{
    public function execute(array $data, Shop $shop): Service
    {
        // Check for duplicate service name in the same shop
        if ($shop->service()->where('service_name', $data['service_name'])->exists()) {
            throw DuplicateServiceException::duplicateServiceException(
                $data['service_name'], 
                $shop->shop_name
            );
        }

        return DB::transaction(function () use ($shop, $data) {
            return $shop->service()->create([
                'shop_id'      => $shop->id,
                'user_id'      => $shop->user_id,
                'service_name' => $data['service_name'],
                'cost'         => $data['cost'],
                'duration'     => $data['duration'],
            ]);
        });
    }
}