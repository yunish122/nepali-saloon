<?php

namespace App\Http\Controllers;

use App\Exceptions\NoMoreThanThreeShopException;
use App\Http\Requests\CreateShopRequest;
use App\Services\CreateShopService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function __construct( private CreateShopService $service)
    {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateShopRequest $request)
    {
        
        $store = $this->service->createShop($request->user(),$request->validated());

        return response()->json($store,201);
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
