<?php

namespace App\Policies;

use App\Models\QueueEntry;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class QueueEntryPolicy
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
    public function view(User $user, QueueEntry $queueEntry): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, QueueEntry $queueEntry): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, QueueEntry $queueEntry): bool
    {
        $val = $user->id === $queueEntry->user_id;
        return $val;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, QueueEntry $queueEntry): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, QueueEntry $queueEntry): bool
    {
        return false;
    }
}
