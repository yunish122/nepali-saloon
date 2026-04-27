<?php

namespace App\Http\Controllers;

use App\Exceptions\DuplicateQueueEntryException;
use App\Exceptions\InvalidQueueEntry;
use App\Models\QueueEntry;
use App\Models\Service;
use App\Models\Shop;
use App\Models\User;
use App\Services\DeleteQueueEntryService;
use App\Services\CreateQueueEntryService;
use Illuminate\Http\Request;

class QueueEntryController extends Controller
{
    use \Illuminate\Foundation\Auth\Access\AuthorizesRequests;

    public function __construct(private CreateQueueEntryService $queueEntry, private DeleteQueueEntryService $delete_queue_entry) {}

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
        try {
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

        } catch (DuplicateQueueEntryException $e) {
            return response()->json(['error' => $e->getMessage()], 411);
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
    public function destroy(QueueEntry $queueEntry)
    {
        try{
            $this->authorize('delete', $queueEntry);
            $this->delete_queue_entry->execute($queueEntry);
            return response()->noContent();            
        }catch(InvalidQueueEntry $e){
            return response()->json(['error'=>$e->getMessage()],422);
        }
  
    }
}
