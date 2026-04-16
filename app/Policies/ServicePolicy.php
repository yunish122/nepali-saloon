<?php

namespace App\Policies;

use App\Models\Service;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ServicePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Service $service): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Shop $shop): bool
    {
        $arg1 = $user->hasRole('owner') || $user->hasRole('staff');
        $arg2 = $user->id === $shop->user_id;

        return $arg1 && $arg2;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user): bool
    {
        $arg1 = $user->hasRole('owner') || $user->hasRole('staff');
        return $arg1;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Service $service): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Service $service): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Service $service): bool
    {
        return false;
    }
}
