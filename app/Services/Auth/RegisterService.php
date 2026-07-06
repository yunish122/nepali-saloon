<?php

namespace App\Services\Auth;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class RegisterService{
        public function registerService(array $data){
            //email existion check
            if(User::where('email', $data['email'] )->exists()) {
                throw new Exception("Email already exists");
            }

            
            $role = $data['role'];
            if(!in_array(strtolower($role),['customer','owner','staff'])){
                throw new Exception("Invalid role");
            }

            return DB::transaction(function () use ($data) {
                $user = User::create([
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'phoneNum' => $data['phoneNum'],
                    'password' => Hash::make($data['password'])
                ]);
                $user->assignRole($data['role']);
                return $user;
            });
        }
    }

?>