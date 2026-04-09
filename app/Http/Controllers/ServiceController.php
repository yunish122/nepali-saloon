<?php

namespace App\Http\Controllers;

use App\Exceptions\CanNotDeleteServiceException;
use App\Http\Requests\CreateServiceRequest;
use App\Models\Service;
use App\Models\Shop;
use App\Models\User;
use App\Services\CreateServiceService;
use App\Services\DeleteServiceService;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function __construct(private CreateServiceService $create_service_service,private DeleteServiceService $delete_service)
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
    public function store(CreateServiceRequest $request)
    {
        
        $service = $this->create_service_service->execute($request->validated(), $request->shop);
        
        return response()->json($service,201);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        //
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user,Shop $shop, Service $service)
    {
        try{

            if(($shop->user_id === $user->id) && $user->can('delete.service')){
                $this->delete_service->softDelete($service);

            }else{
                throw CanNotDeleteServiceException::unauthorizeServiceDeletion($user,$shop,$service);
            }            
        }catch (CanNotDeleteServiceException $e){
            return response()->json(['error'=>$e->getMessage()]);
        }

    }
}
