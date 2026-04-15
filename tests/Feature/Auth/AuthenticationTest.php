<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $user = User::factory()->create();
        Role::findOrCreate('customer', 'web');
        $user->assignRole('customer');

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
            'role' => 'customer',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('discover-salons', absolute: false));
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();
        Role::findOrCreate('customer', 'web');
        $user->assignRole('customer');

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
            'role' => 'customer',
        ]);

        $this->assertGuest();
    }

    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }

    public function test_non_customer_roles_are_blocked_from_login_for_now(): void
    {
        $user = User::factory()->create();
        Role::findOrCreate('staff', 'web');
        $user->assignRole('staff');

        $response = $this->from('/login')->post('/login', [
            'email' => $user->email,
            'password' => 'password',
            'role' => 'staff',
        ]);

        $this->assertGuest();
        $response->assertRedirect('/login');
        $response->assertSessionHasErrors('role');
    }
}
