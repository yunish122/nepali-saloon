<?php

namespace App\Http\Controllers;

use App\Enums\QueueEntryStatus;
use App\Models\QueueEntry;
use App\Models\Service;
use App\Models\Shop;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function discoverSalons(Request $request)
    {
        $shops = Shop::with('user')
            ->where('status', 1)
            ->get()
            ->map(fn ($shop) => [
                'id' => $shop->id,
                'shop_name' => $shop->shop_name,
                'location' => $shop->location,
                'phone' => $shop->phone,
                'opening_time' => $shop->opening_time,
                'closing_time' => $shop->closing_time,
                'status' => $shop->status,
            ]);

        return Inertia::render('Customer/DiscoverSalons', [
            'shops' => $shops,
        ]);
    }

    public function myQueue(Request $request)
    {
        $user = $request->user();

        $activeStatuses = [
            QueueEntryStatus::pending,
            QueueEntryStatus::in_progress,
        ];

        $entries = QueueEntry::query()
            ->where('user_id', $user->id)
            ->whereIn('status', $activeStatuses)
            ->with(['service.shop.queue'])
            ->orderBy('created_at')
            ->get()
            ->map(function (QueueEntry $entry) use ($activeStatuses) {
                $service = $entry->service;
                $shop = $service?->shop;

                if (! $service || ! $shop) {
                    return null;
                }

                $shopActiveEntries = QueueEntry::query()
                    ->whereIn('status', $activeStatuses)
                    ->whereHas('service', fn ($query) => $query->where('shop_id', $shop->id))
                    ->orderBy('created_at')
                    ->get(['id', 'created_at']);

                $position = $shopActiveEntries
                    ->search(fn (QueueEntry $shopEntry) => $shopEntry->id === $entry->id);

                $position = $position === false ? 1 : $position + 1;

                $avgDurationMinutes = (int) ($shop->queue?->default_duration ?? $service->duration ?? 0);
                $waitMinutes = max(0, ($position - 1) * $avgDurationMinutes);

                $arriveBefore = Carbon::now()->addMinutes($waitMinutes);

                return [
                    'entry_id' => $entry->id,
                    'queue_status' => $entry->status->name,
                    'position' => $position,
                    'wait_minutes' => $waitMinutes,
                    'arrive_before' => $arriveBefore->format('h:i A'),
                    'total_in_queue' => $shopActiveEntries->count(),
                    'shop' => [
                        'id' => $shop->id,
                        'shop_name' => $shop->shop_name,
                        'location' => $shop->location,
                        'phone' => $shop->phone,
                        'opening_time' => $shop->opening_time,
                        'closing_time' => $shop->closing_time,
                    ],
                    'service' => [
                        'id' => $service->id,
                        'service_name' => $service->service_name,
                        'duration' => $service->duration,
                    ],
                ];
            })
            ->filter()
            ->values();

        return Inertia::render('Customer/MyQueue', [
            'entries' => $entries,
        ]);
    }

    public function shopDetails(Request $request, Shop $shop)
    {
        $activeStatuses = [
            QueueEntryStatus::pending,
            QueueEntryStatus::in_progress,
        ];

        $services = Service::query()
            ->where('shop_id', $shop->id)
            ->orderBy('service_name')
            ->get()
            ->map(fn (Service $service) => [
                'id' => $service->id,
                'service_name' => $service->service_name,
                'cost' => $service->cost,
                'duration' => $service->duration,
                'priority' => $service->duration >= 60 ? 'high' : ($service->duration >= 30 ? 'medium' : 'low'),
            ])
            ->values();

        $activeEntries = QueueEntry::query()
            ->whereIn('status', $activeStatuses)
            ->whereHas('service', fn ($query) => $query->where('shop_id', $shop->id))
            ->with('service:id,service_name')
            ->orderBy('created_at')
            ->get();

        $currentQueue = $activeEntries
            ->take(8)
            ->values()
            ->map(fn (QueueEntry $entry, int $index) => [
                'id' => $entry->id,
                'position' => $index + 1,
                'service_name' => $entry->service?->service_name ?? 'Service',
                'status' => $entry->status->name,
            ]);

        $defaultDuration = (int) ($shop->queue?->default_duration ?? 0);
        $estimatedWait = $activeEntries->count() * $defaultDuration;

        $alreadyQueuedServiceIds = QueueEntry::query()
            ->where('user_id', $request->user()->id)
            ->whereIn('status', $activeStatuses)
            ->whereHas('service', fn ($query) => $query->where('shop_id', $shop->id))
            ->pluck('service_id')
            ->values();

        return Inertia::render('Customer/ShopDetails', [
            'shop' => [
                'id' => $shop->id,
                'shop_name' => $shop->shop_name,
                'location' => $shop->location,
                'phone' => $shop->phone,
                'opening_time' => $shop->opening_time,
                'closing_time' => $shop->closing_time,
            ],
            'services' => $services,
            'queueSummary' => [
                'in_queue' => $activeEntries->count(),
                'wait_minutes' => $estimatedWait,
                'current_queue' => $currentQueue,
            ],
            'alreadyQueuedServiceIds' => $alreadyQueuedServiceIds,
        ]);
    }

    public function joinQueue(Request $request, Shop $shop)
    {
        $validated = $request->validate([
            'service_ids' => ['required', 'array', 'min:1'],
            'service_ids.*' => [
                'required',
                'integer',
                Rule::exists('services', 'id')->where(fn ($query) => $query->where('shop_id', $shop->id)),
            ],
        ]);

        $serviceIds = collect($validated['service_ids'])
            ->map(fn ($id) => (int) $id)
            ->unique()
            ->values();

        $activeStatuses = [
            QueueEntryStatus::pending,
            QueueEntryStatus::in_progress,
        ];

        $existingServiceIds = QueueEntry::query()
            ->where('user_id', $request->user()->id)
            ->whereIn('status', $activeStatuses)
            ->whereIn('service_id', $serviceIds)
            ->pluck('service_id')
            ->map(fn ($id) => (int) $id)
            ->values();

        $newServiceIds = $serviceIds->diff($existingServiceIds);

        foreach ($newServiceIds as $serviceId) {
            QueueEntry::create([
                'service_id' => $serviceId,
                'user_id' => $request->user()->id,
                'status' => QueueEntryStatus::pending,
            ]);
        }

        return redirect()
            ->route('my-queue')
            ->with('success', 'Joined queue successfully.');
    }

    public function destroyQueueEntry(Request $request, QueueEntry $queueEntry)
    {
        abort_unless((int) $queueEntry->user_id === (int) $request->user()->id, 403);

        $queueEntry->status = QueueEntryStatus::cancelled;
        $queueEntry->save();

        return back()->with('success', 'Queue entry removed successfully.');
    }
}
