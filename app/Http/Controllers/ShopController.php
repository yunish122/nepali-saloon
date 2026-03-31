<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateShopRequest;
use App\Http\Requests\UpdateShopRequest;
use App\Models\Shop;
use App\Services\CreateShopService;
use App\Services\DeleteShopService;
use App\Services\UpdateShopService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ShopController extends Controller
{
    use AuthorizesRequests;

    public function __construct(private CreateShopService $service, private UpdateShopService $updateService,
        private DeleteShopService $delShopService
    ) {}

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

        $store = $this->service->createShop($request->user(), $request->validated());

        return response()->json($store, 201);
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
    public function update(UpdateShopRequest $request, Shop $shop)
    {
        $updated = $this->updateService->update_shop($shop, $request->validated());

        return response()->json($updated, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shop $shop)
    {
        $this->authorize('delete', $shop);

        $this->delShopService->deleteShop($shop);
        
        return response()->noContent(); //204
    }
}
