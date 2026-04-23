<?php

namespace App\Http\Controllers;

use App\Exceptions\DuplicateQueueEntryException;
use App\Models\Service;
use App\Models\Shop;
use App\Models\User;
use App\Services\CreateQueueEntryService;
use Illuminate\Http\Request;

class QueueEntryController extends Controller
{
    public function __construct(private CreateQueueEntryService $queueEntry) {}

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
    public function store(Request $request)
    {
        try{
            $validated = $request->validate([
                'queue_id' => ['required', 'exists:queues,id'],
                'service_id' => ['required', 'exists:services,id'],
                'user_id' => ['required', 'exists:users,id'],
            ]);

            $user = User::findOrFail($validated['user_id']);
            $service = Service::findOrFail($validated['service_id']);
            $shop = Shop::findOrFail($service->shop_id);

            $qEntry = $this->queueEntry->execute($shop->queue, $user, $shop, $service);
            return response()->json($qEntry, 201);

        }catch(DuplicateQueueEntryException $e){
            return response()->json(['error'=>$e->getMessage()],411);
        }

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
