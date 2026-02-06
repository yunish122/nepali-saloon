<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\Invarient\RoleSeeder as InvarientRoleSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\Invarient\RoleSeeder;
use Database\Seeders\Invarient\PermissionSeeders;
use Database\Seeders\Invarient\RolesPermissionSeeders;
class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call([
            RoleSeeder::class,
            PermissionSeeders::class,
            RolesPermissionSeeders::class
        ]);
    }
}
