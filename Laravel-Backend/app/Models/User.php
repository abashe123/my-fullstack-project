<?php
// User.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'rank', 'phone_number', 'role_id',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function patients()
    {
        return $this->hasMany(Patient::class);
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }   

    
    public function notifications()
    {
        return $this->hasMany(Notification::class); // or the appropriate relationship
    }

}
