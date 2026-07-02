<?php

namespace App\Http\Controllers;

use App\Exceptions\CanNotDeleteServiceException;
use App\Http\Requests\CreateServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Service;
use App\Models\Shop;
use App\Models\User;
use App\Services\CreateServiceService;
use App\Services\DeleteServiceService;
use App\Services\UpdateServiceService;

class ServiceController extends Controller
{
    public function __construct(private CreateServiceService $create_service_service, private DeleteServiceService $delete_service, private UpdateServiceService $update_service_service) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Service::all();

        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateServiceRequest $request)
    {
        $validated = $request->validated();
        $shop = Shop::findOrFail($validated['shop_id']);
    
        $service = $this->create_service_service->execute($validated, $shop);

        return response()->json($service, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show() {}

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequest $request, Service $service)
    {
        $serv = $this->update_service_service->update_service($service, $request->validated());

        return $serv;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        try {
            $user = $service->user;
            $shop = $service->shop;

            if (($shop->user_id === $user->id) && $user->can('delete.service')) {

                $this->delete_service->softDelete($service);

            } else {
                throw CanNotDeleteServiceException::unauthorizeServiceDeletion($user, $shop, $service);
            }
        } catch (CanNotDeleteServiceException $e) {
   // dd("hya samma pugexa");

            return response()->json(['error' => $e->getMessage()]);
        }
        return response()->json("deleted",201);
    }
    
}
