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
            'service_name' => fake()->randomElement(['Hair Cut','Trimming','Fade','Facial',"Classic Buzz Cut","Skin Fade Undercut","Textured Quiff","Classic Pompadour","Messy French Crop","Slicked Back Fade","Taper Fade","Modern Mullet","Crew Cut","Gentleman's Side Part","Layered Bob","Pixie Cut","Curtain Bangs Shag","Blunt Cut Bob","Afro High Top Fade","Wolf Cut","Textured Caesar Cut","Long Layered Waves","Faux Hawk (Frohawk)","Bald Fade (Razor Fade)"]),
            'duration'=> fake()->numberBetween(15,360),
            'shop_id'=>Shop::factory(),
            'user_id'=>User::factory(),
        ];
    }
}
