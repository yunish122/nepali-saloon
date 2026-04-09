<?php

namespace Database\Factories;

use App\Models\Shop;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Symfony\Component\VarDumper\Caster\ConstStub;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'cost'=>fake()->numberBetween(10,60),
            'service_name' => fake()->randomElement(['Hair Cut','Trimming','Fade','Facial']),
            'duration'=> fake()->numberBetween(15,360),
            'shop_id'=>Shop::factory(),
            'user_id'=>User::factory(),
        ];
    }
}
