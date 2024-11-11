<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;


    // UserPolicy.php
    public function view(User $user, Patient $patient)
    {
        return $user->id === $patient->user_id || $user->role === 'admin';
    }


    // Other authorization methods as needed
}
