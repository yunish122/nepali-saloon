<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Psy\Readline\Hoa\Console;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function login(LoginRequest $req){
        $cred = $req->validated();
        $data = $req->safe()->only(['email', 'password']);
        
        if(!Auth::attempt($data)){
            return response()->json([
                'message'=>'Not valid credential'
            ]);
        }

        
        $req->session()->regenerate();

        return response()->json([
            'message'=>'login successful',
            'user'=>Auth::user(),
            'role' => $cred->role
            
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
