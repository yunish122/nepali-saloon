<?php

namespace Database\Factories;

use App\Enums\DayOfWeekStatus;
use App\Enums\QueueStatus;
use App\Models\Shop;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Queue>
 */
class QueueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'day' => fake()->randomElement(DayOfWeekStatus::cases()),
            'default_duration' => fake()->numberBetween(20,60),
            'status'=>QueueStatus::open,
            'shop_id'=>Shop::factory()
        ];
    }
}
