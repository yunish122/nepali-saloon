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
     * Preset locations provided for shop seeding.
     *
     * @var array<int, array{name: string, city: string, district: string}>
     */
    private const SHOP_LOCATIONS = [
        ['name' => 'New Road Center', 'city' => 'Kathmandu', 'district' => 'Kathmandu'],
        ['name' => 'Thamel Market Hub', 'city' => 'Kathmandu', 'district' => 'Kathmandu'],
        ['name' => 'Asan Bazaar', 'city' => 'Kathmandu', 'district' => 'Kathmandu'],
        ['name' => 'Patan Durbar Area', 'city' => 'Lalitpur', 'district' => 'Lalitpur'],
        ['name' => 'Kupondole Heights', 'city' => 'Lalitpur', 'district' => 'Lalitpur'],
        ['name' => 'Bhaktapur Old Town', 'city' => 'Bhaktapur', 'district' => 'Bhaktapur'],
        ['name' => 'Lakeside Bazaar', 'city' => 'Pokhara', 'district' => 'Kaski'],
        ['name' => 'Chipledhunga Market', 'city' => 'Pokhara', 'district' => 'Kaski'],
        ['name' => 'Narayanghat Main Road', 'city' => 'Bharatpur', 'district' => 'Chitwan'],
        ['name' => 'Biratnagar Mills Area', 'city' => 'Biratnagar', 'district' => 'Morang'],
        ['name' => 'Main Road, Itahari', 'city' => 'Itahari', 'district' => 'Sunsari'],
        ['name' => 'Nepalgunj Trade Center', 'city' => 'Nepalgunj', 'district' => 'Banke'],
        ['name' => 'Dhangadhi Main Bazaar', 'city' => 'Dhangadhi', 'district' => 'Kailali'],
        ['name' => 'Hetauda Industrial District', 'city' => 'Hetauda', 'district' => 'Makwanpur'],
        ['name' => 'Janakpur Shopping Hub', 'city' => 'Janakpur', 'district' => 'Dhanusha'],
    ];

    /**
     * Preset shop names provided for shop seeding.
     *
     * @var array<int, string>
     */
    private const SHOP_NAMES = [
        'The Grooming Station',
        'Elite Hair & Beauty Studio',
        'Kathmandu Cuts',
        'Urban Styles Saloon',
        'Signature Look Salon',
        'Everest Hair Design',
        'Modern Man Barbershop',
        'Beauty & Beyond Salon',
        'Royal Cuts & Spa',
        'Glamour Hair Studio',
        'Patan Barber House',
        'Trendy Looks Saloon',
        'Style Junction',
        'Gentlemen\'s Grooming Hub',
        'Radiance Beauty & Hair',
        'The Barber\'s Chair',
        'Aura Unisex Salon',
        'New Look Hair Point',
        'Classic Cut Saloon',
        'Zenith Hair & Spa',
    ];

    /**
     * @return array<int, array{name: string, city: string, district: string}>
     */
    public static function locations(): array
    {
        return self::SHOP_LOCATIONS;
    }

    /**
     * @return array<int, string>
     */
    public static function names(): array
    {
        return self::SHOP_NAMES;
    }

    public static function formattedLocation(array $location): string
    {
        return sprintf('%s, %s, %s', $location['name'], $location['city'], $location['district']);
    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->randomElement(self::SHOP_NAMES);
        $location = fake()->randomElement(self::SHOP_LOCATIONS);

        return [
            'shop_name' => $name,
            'location' => self::formattedLocation($location),
            'phone' => fake()->unique()->numerify('98########'),
            'opening_time' => fake()->time('H:i:s'),
            'closing_time' => fake()->time('H:i:s'),
            'status' => ShopStatus::open->value,
            'user_id' => User::factory(),
        ];
    }
}
