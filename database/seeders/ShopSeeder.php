<?php

namespace Database\Seeders;

use App\Enums\ShopStatus;
use App\Models\Service;
use App\Models\Shop;
use Database\Factories\ShopFactory;
use Illuminate\Database\Seeder;

class ShopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultServices = [
            ['service_name' => 'Hair Cut', 'cost' => 600, 'duration' => 35],
            ['service_name' => 'Hair Color', 'cost' => 1800, 'duration' => 90],
            ['service_name' => 'Facial', 'cost' => 1200, 'duration' => 60],
            ['service_name' => 'Threading', 'cost' => 200, 'duration' => 20],
        ];

        $names = ShopFactory::names();
        $locations = ShopFactory::locations();
        $shopsToCreate = 8;

        $sequence = [];

        for ($index = 0; $index < $shopsToCreate; $index++) {
            $sequence[] = [
                'shop_name' => $names[$index],
                'location' => ShopFactory::formattedLocation($locations[$index]),
                'phone' => sprintf('98%08d', $index + 10000000),
                'opening_time' => '09:00:00',
                'closing_time' => '19:00:00',
                'status' => $index < 4 ? ShopStatus::close->value : ShopStatus::open->value,
            ];
        }

        $shops = Shop::factory()->count($shopsToCreate)->sequence(...$sequence)->create();

        $shops->each(function (Shop $shop) use ($defaultServices): void {
            foreach ($defaultServices as $service) {
                Service::query()->firstOrCreate(
                    [
                        'shop_id' => $shop->id,
                        'service_name' => $service['service_name'],
                    ],
                    [
                        'cost' => $service['cost'],
                        'duration' => $service['duration'],
                        'user_id' => $shop->user_id,
                    ]
                );
            }
        });
    }
}
