<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, HasRoles, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'phoneNum',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /**
     * Get the shops owned by this user (if user is an owner)
     */
    public function shops()
    {
        return $this->hasMany(Shop::class, 'owner_id');
    }

    /**
     * Get the queue entries for this user
     */
    public function queueEntries()
    {
        return $this->hasMany(QueueEntry::class, 'user_id');
    }

    /**
     * Get all shops where this user works as staff
     */
    public function staffShops()
    {
        return $this->belongsToMany(Shop::class, 'shop_staff', 'user_id', 'shop_id')->withTimestamps();
    }
}
