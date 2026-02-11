<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesPermissionSeeders extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $onwerPermission = [ 
            'update_status.shop',
            'delete.shop',
            'block.shop',
            'create.shop',
            'create.service',
            'update.service',
            'delete.service',
            'create.queue',
            'update.queue',
            'delete.queue',
            'assign_staff.queue',
            'assign_customer.queue',
            'enter.queue',
            'cancel.queue',
            'process.payment',
            'update.payment',
            'refund.payment',
            'make.payment',
            'submit.rating',
            'assign.staff',
            'fire.staff',
            'user.block',
            'user.update'
        ];

        $staffPermission = [
            'create.service','update.service','delete.service',
            'create.queue',
            'update.queue',
            'user.update',
            'delete.queue',
            'user.block',
            'process.payment',
            'payment.update','select.service'
        ];

        $customerPermission = [
            'enter.queue',
            'submit.rating',
            'select.service'
        ];
        

        $owner = Role::findByName('owner');
        $owner->syncPermissions($onwerPermission);

        $staff = Role::findByName('staff');
        $staff->syncPermissions($staffPermission);

        $customer = Role::findByName('customer');
        $customer->syncPermissions($customerPermission);
    }
}
