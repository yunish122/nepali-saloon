<?php

namespace Database\Seeders\Invarient;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['owner','customer','staff'];
        
        foreach($roles as $role){
            Role::firstOrCreate(['name'=>$role]);
        }
    }
}
