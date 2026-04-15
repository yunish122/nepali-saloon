import { Head, Link, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import ProfileMenuModal from '../../Components/ProfileMenuModal';

export default function ShopDetails({ auth, shop, services, queueSummary, alreadyQueuedServiceIds }) {
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const selectedCount = selectedServiceIds.length;

    const shopOpen = useMemo(() => {
        const now = new Date();
        const [openHour, openMinute] = shop.opening_time.split(':').map(Number);
        const [closeHour, closeMinute] = shop.closing_time.split(':').map(Number);

        const openTime = new Date(now);
        openTime.setHours(openHour, openMinute, 0, 0);

        const closeTime = new Date(now);
        closeTime.setHours(closeHour, closeMinute, 0, 0);

        return now >= openTime && now <= closeTime;
    }, [shop.closing_time, shop.opening_time]);

    const isServiceAlreadyQueued = (serviceId) => alreadyQueuedServiceIds.includes(serviceId);

    const toggleService = (serviceId) => {
        if (isServiceAlreadyQueued(serviceId)) {
            return;
        }

        setSelectedServiceIds((current) => {
            if (current.includes(serviceId)) {
                return current.filter((id) => id !== serviceId);
            }

            return [...current, serviceId];
        });
    };

    const joinQueue = () => {
        if (!shopOpen || selectedCount === 0) {
            return;
        }

        router.post(`/shops/${shop.id}/join-queue`, {
            service_ids: selectedServiceIds,
        });
    };

    const formatWait = (minutes) => {
        if (!minutes || minutes <= 0) {
            return 'Now';
        }

        return `~${minutes}min`;
    };

    const priorityStyles = {
        high: 'bg-red-100 text-red-700',
        medium: 'bg-slate-100 text-slate-700',
        low: 'bg-slate-50 text-slate-600',
    };

    return (
        <>
            <Head title={shop.shop_name} />

            <div className="min-h-screen bg-[#f5f7fa]">
                <header className="border-b border-[#d4dce6] bg-white">
                    <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-3 sm:px-6">
                        <div className="flex items-center gap-6">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="grid h-9 w-9 place-items-center rounded-md bg-[#0e1b3a] text-sm font-semibold text-[#5a78a8]">
                                    S
                                </div>
                                <span className="text-xl font-bold tracking-tight text-[#0e1b3a]">SalonHub</span>
                            </Link>
                            <nav className="hidden gap-6 md:flex">
                                <Link href="/discover-salons" className="text-sm text-[#7a8fa3] hover:text-[#0e1b3a]">
                                    Salons
                                </Link>
                                <Link href="/my-queue" className="text-sm text-[#7a8fa3] hover:text-[#0e1b3a]">
                                    My Queue
                                </Link>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-[#2d3e52]">{auth.user.name}</span>
                            <button
                                type="button"
                                onClick={() => setShowProfileMenu(true)}
                                className="rounded-full bg-[#eef2f6] p-2 text-[#0e1b3a]"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="mx-auto flex w-full max-w-[1200px] gap-3 px-4 pb-3 md:hidden sm:px-6">
                        <Link href="/discover-salons" className="rounded-lg px-3 py-1.5 text-sm text-[#6d819c]">
                            Salons
                        </Link>
                        <Link href="/my-queue" className="rounded-lg px-3 py-1.5 text-sm text-[#6d819c]">
                            My Queue
                        </Link>
                    </div>
                </header>

                <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6">
                    <Link href="/discover-salons" className="inline-flex text-base font-semibold text-[#2d3e52] hover:text-[#0e1b3a]">
                        Back to Salons
                    </Link>

                    <section className="mt-4 grid gap-3 lg:grid-cols-2">
                        <div className="h-[240px] overflow-hidden rounded-xl bg-gradient-to-br from-[#b9c4d3] to-[#aab8cb] sm:h-[280px] lg:h-[300px]">
                            <img
                                src={`https://placehold.co/1000x700/e2e8f0/475569?text=${encodeURIComponent(shop.shop_name)}`}
                                alt={shop.shop_name}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="rounded-xl border border-[#d4dce6] bg-white p-4 shadow-sm">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h1 className="text-2xl font-bold text-[#2d3e52] sm:text-3xl">{shop.shop_name}</h1>
                                    <p className="mt-1 text-base text-[#5c7291]">{shop.location}</p>
                                </div>
                                <span
                                    className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${shopOpen
                                        ? 'border-[#93e0bf] bg-[#dbf7ea] text-[#007f4e]'
                                        : 'border-[#f2cc82] bg-[#fff4dd] text-[#c56c00]'
                                        }`}
                                >
                                    {shopOpen ? 'Open' : 'Closed'}
                                </span>
                            </div>

                            <div className="mt-4 border-t border-[#d4dce6] pt-4 text-[#2d3e52]">
                                <p className="text-sm">{shop.opening_time.slice(0, 5)} - {shop.closing_time.slice(0, 5)}</p>
                                <p className="mt-1 text-sm">{shop.location}</p>
                                <p className="mt-1 text-sm">{shop.phone}</p>
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-xl border border-[#d4dce6] bg-[#f8fafc] p-3 text-center">
                                    <p className="text-2xl font-bold text-[#2d3e52]">{queueSummary.in_queue}</p>
                                    <p className="mt-1 text-sm text-[#5c7291]">In Queue</p>
                                </div>
                                <div className="rounded-xl border border-[#d4dce6] bg-[#f8fafc] p-3 text-center">
                                    <p className="text-2xl font-bold text-[#2d3e52]">{formatWait(queueSummary.wait_minutes)}</p>
                                    <p className="mt-1 text-sm text-[#5c7291]">Wait Time</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mt-6 rounded-xl border border-[#d4dce6] bg-white p-4 shadow-sm">
                        <h2 className="text-xl font-bold text-[#2d3e52]">Services</h2>
                        <p className="mt-1 text-sm text-[#5c7291]">Select services you want to book</p>

                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                            {services.map((service) => {
                                const checked = selectedServiceIds.includes(service.id);
                                const disabled = isServiceAlreadyQueued(service.id);

                                return (
                                    <button
                                        key={service.id}
                                        type="button"
                                        onClick={() => toggleService(service.id)}
                                        disabled={disabled}
                                        className={`flex w-full items-start justify-between rounded-lg border p-3 text-left transition ${checked
                                            ? 'border-[#0e1b3a] bg-[#eef3ff]'
                                            : 'border-[#d4dce6] bg-white'
                                            } ${disabled ? 'cursor-not-allowed opacity-60' : 'hover:border-[#0e1b3a]'}`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                checked={checked || disabled}
                                                readOnly
                                                className="mt-0.5 h-4 w-4 rounded border-[#b8c5d7]"
                                            />
                                            <div>
                                                <p className="text-base font-semibold text-[#2d3e52]">{service.service_name}</p>
                                                <p className="mt-0.5 text-sm text-[#5c7291]">Rs. {Number(service.cost).toFixed(0)} - {service.duration} min</p>
                                                {disabled && <p className="mt-1 text-sm text-[#c56c00]">Already in your queue</p>}
                                            </div>
                                        </div>
                                        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${priorityStyles[service.priority]}`}>
                                            {service.priority}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    <section className="mt-6 rounded-xl border border-[#d4dce6] bg-white p-4 shadow-sm">
                        <h2 className="text-xl font-bold text-[#2d3e52]">Current Queue</h2>
                        <p className="mt-1 text-sm text-[#5c7291]">Real-time queue status for today</p>

                        <div className="mt-4 rounded-lg border border-[#d4dce6] bg-[#f8fafc] p-3">
                            {queueSummary.current_queue.length === 0 ? (
                                <p className="py-4 text-center text-sm text-[#5c7291]">No one in queue</p>
                            ) : (
                                <div className="space-y-2">
                                    {queueSummary.current_queue.map((entry) => (
                                        <div key={entry.id} className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
                                            <span className="text-sm font-semibold text-[#2d3e52]">#{entry.position} {entry.service_name}</span>
                                            <span className="text-sm capitalize text-[#5c7291]">{entry.status.replace('_', ' ')}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="mt-6 grid gap-3 sm:grid-cols-2">
                        <Link
                            href="/discover-salons"
                            className="rounded-lg border border-[#d4dce6] bg-white px-4 py-2 text-center text-sm font-semibold text-[#2d3e52] transition hover:bg-[#f8fafc]"
                        >
                            Back to Salons
                        </Link>
                        <button
                            type="button"
                            onClick={joinQueue}
                            disabled={!shopOpen || selectedCount === 0}
                            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${(!shopOpen || selectedCount === 0)
                                ? 'cursor-not-allowed bg-[#a0b0c5]'
                                : 'bg-[#0e1b3a] hover:bg-[#152d66]'
                                }`}
                        >
                            Join Queue
                        </button>
                    </section>
                </main>
            </div>

            <ProfileMenuModal
                show={showProfileMenu}
                onClose={() => setShowProfileMenu(false)}
                userName={auth.user.name}
            />
        </>
    );
}
