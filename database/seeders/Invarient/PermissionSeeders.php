<?php

namespace Database\Seeders\Invarient;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeders extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $permissions = [
            // Shop
            'update_status.shop',
            'delete.shop',
            'block.shop',

            // Service
            'create.service',
            'update.service',
            'delete.service',
            'select.service',
            // Queue
            'create.queue',
            'update.queue',
            'delete.queue',
            'assign_staff.queue',
            'assign_customer.queue',
            'enter.queue',
            'cancel.queue',
            // Payment
            'process.payment',
            'update.payment',
            'refund.payment',
            'make.payment',
            // Rating
            'submit.rating',

            // Staff
            'assign.staff',
            'fire.staff',

            // User
            'user.block',
            'user.update'
        ];

        foreach($permissions as $p){
            Permission::firstOrCreate(['name'=>$p]);
        }

    }
}
