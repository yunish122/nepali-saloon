<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Services\Auth\RegisterService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class AuthController extends Controller
{
    public function __construct(private RegisterService $registerService)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function login(LoginRequest $req)
    {
        $cred = $req->validated();
        $data = $req->safe()->only(['email', 'password']);
        if (!Auth::attempt($data)) {
            return response()->json([
                'message' => 'Not valid credential',
            ],401);
        }

        $req->session()->regenerate();
        return response()->json([
            'message' => 'login successful',
        ]);
    }

    public function register(RegisterRequest $req){
        $cred = $req->validated();

        try{
            $user = $this->registerService->registerService($cred);
        }catch(Exception $e){
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }

        return response()->json([
            'user' => $user,
            'message' => "Registered sucessfully"
        ],201);


    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'name' => ['required', 'string', 'max:255'],
    //         'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
    //         'password' => ['required', 'string', 'confirmed'],
    //         'role' => ['required', 'in:customer,staff,owner'],
    //     ]);

    //     $user = User::create([
    //         'name' => $validated['name'],
    //         'email' => $validated['email'],
    //         'password' => Hash::make($validated['password']),
    //     ]);

    //     $user->assignRole($validated['role']);

    //     Auth::login($user);

    //     $request->session()->regenerate();

    //     return response()->json([
    //         'message' => 'registration successful',
    //         'user' => $user,
    //         'role' => $validated['role'],
    //     ], 201);
    // }

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
