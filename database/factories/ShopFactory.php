<?php

namespace Database\Factories;

use App\Enums\ShopStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shop>
 */
class ShopFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'shop_name'=>fake()->name(),
            'location' => fake()->city(),
            'phone' => fake()->unique()->numerify('98########'),
            'opening_time' => fake()->time('H:i:s'),
            'closing_time' => fake()->time('H:i:s'),
            'status' => ShopStatus::open,
            'user_id' => User::factory()
        ];
    }
}
