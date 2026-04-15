import { Head, Link, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import Modal from '../../Components/Modal';
import ProfileMenuModal from '../../Components/ProfileMenuModal';

export default function MyQueue({ auth, entries }) {
    const [contactEntry, setContactEntry] = useState(null);
    const [copiedPhone, setCopiedPhone] = useState(false);
    const [confirmDeleteEntry, setConfirmDeleteEntry] = useState(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const hasEntries = useMemo(() => entries && entries.length > 0, [entries]);

    const closeContactModal = () => {
        setContactEntry(null);
        setCopiedPhone(false);
    };

    const copyPhoneNumber = async () => {
        const phone = contactEntry?.shop?.phone?.trim();

        if (!phone) {
            return;
        }

        try {
            await navigator.clipboard.writeText(phone);
            setCopiedPhone(true);
            setTimeout(() => setCopiedPhone(false), 1600);
        } catch {
            setCopiedPhone(false);
        }
    };

    const deleteQueue = (entryId) => {
        setConfirmDeleteEntry(null);

        router.delete(`/my-queue/${entryId}`, {
            preserveScroll: true,
        });
    };

    const getStatusBadge = (status) => {
        if (status === 'in_progress') {
            return 'bg-[#d4f5e6] text-[#007f4e] border-[#9ed8bf]';
        }

        return 'bg-[#fff4dd] text-[#c56c00] border-[#f2cc82]';
    };

    const formatWaitTime = (minutes) => {
        if (minutes <= 0) {
            return 'Now';
        }

        return `~${minutes} min`;
    };

    return (
        <>
            <Head title="My Queue" />

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
                                <Link href="/my-queue" className="text-sm font-semibold text-[#0e1b3a]">
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
                        <Link href="/my-queue" className="rounded-lg bg-[#e9eef6] px-3 py-1.5 text-sm font-semibold text-[#0e1b3a]">
                            My Queue
                        </Link>
                    </div>
                </header>

                <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6">
                    <section className="mb-6">
                        <h1 className="text-3xl font-bold text-[#2d3e52] sm:text-4xl">My Queue</h1>
                        <p className="mt-2 text-base text-[#7a8fa3] sm:text-lg">Track your position in salon queues</p>
                    </section>

                    {!hasEntries && (
                        <section className="rounded-xl border border-[#d4dce6] bg-white p-6 text-center shadow-sm">
                            <h2 className="text-2xl font-semibold text-[#2d3e52]">No Active Queues</h2>
                            <p className="mt-2 text-sm text-[#7a8fa3]">You are not currently in any salon queue.</p>
                            <Link
                                href="/discover-salons"
                                className="mt-4 inline-flex rounded-lg border border-[#0e1b3a] bg-[#0e1b3a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#152d66]"
                            >
                                Find More Salons
                            </Link>
                        </section>
                    )}

                    <section className="space-y-5">
                        {entries?.map((entry) => {
                            const progress = Math.min(100, Math.max(0, (entry.position / Math.max(1, entry.total_in_queue)) * 100));

                            return (
                                <article key={entry.entry_id} className="overflow-hidden rounded-xl border border-[#d4dce6] bg-white shadow-sm">
                                    <div className="flex flex-col justify-between gap-3 border-b border-[#d4dce6] bg-[#e8edf5] px-4 py-4 sm:flex-row sm:items-center">
                                        <div>
                                            <h2 className="text-2xl font-bold text-[#2d3e52] sm:text-3xl">{entry.shop.shop_name}</h2>
                                            <p className="mt-1 text-sm text-[#5c7291]">{entry.shop.location}</p>
                                        </div>
                                        <span className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${getStatusBadge(entry.queue_status)}`}>
                                            {entry.queue_status.replace('_', ' ')}
                                        </span>
                                    </div>

                                    <div className="p-4">
                                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                            <div className="rounded-xl border border-[#d4dce6] bg-[#f7f9fc] p-3 text-center">
                                                <p className="text-sm text-[#5c7291]">Queue Number</p>
                                                <p className="mt-1 text-3xl font-extrabold text-[#0e1b3a]">#{entry.position}</p>
                                            </div>
                                            <div className="rounded-xl border border-[#d8ccff] bg-[#f5f2ff] p-3 text-center">
                                                <p className="text-sm text-[#5c7291]">Wait Time</p>
                                                <p className="mt-1 text-3xl font-extrabold text-[#6b4de6]">{formatWaitTime(entry.wait_minutes)}</p>
                                            </div>
                                            <div className="rounded-xl border border-[#d4dce6] bg-[#f7f9fc] p-3 text-center">
                                                <p className="text-sm text-[#5c7291]">Reach Before</p>
                                                <p className="mt-1 text-2xl font-bold text-[#2d3e52]">{entry.arrive_before}</p>
                                            </div>
                                            <div className="rounded-xl border border-[#d4dce6] bg-[#f7f9fc] p-3 text-center">
                                                <p className="text-sm text-[#5c7291]">Total in Queue</p>
                                                <p className="mt-1 text-3xl font-extrabold text-[#2d3e52]">{entry.total_in_queue}</p>
                                            </div>
                                        </div>

                                        <div className="mt-5">
                                            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-[#4e6280]">
                                                <span>Queue Progress</span>
                                                <span>{Math.round(progress)}%</span>
                                            </div>
                                            <div className="h-3 w-full overflow-hidden rounded-full bg-[#d4dce6]">
                                                <div className="h-full rounded-full bg-[#0e1b3a]" style={{ width: `${progress}%` }} />
                                            </div>
                                        </div>

                                        <div className="mt-5 rounded-lg bg-[#e1e8f2] px-4 py-2.5 text-sm text-[#2d3e52]">
                                            <div className="flex items-center justify-between gap-4">
                                                <span>{entry.service.service_name}</span>
                                                <span>{entry.service.duration} min</span>
                                            </div>
                                        </div>

                                        <div className="mt-5 grid gap-2 border-t border-[#d4dce6] pt-4 text-sm text-[#4e6280] sm:grid-cols-3">
                                            <p>{entry.shop.location}</p>
                                            <p>
                                                {entry.shop.opening_time.slice(0, 5)} - {entry.shop.closing_time.slice(0, 5)}
                                            </p>
                                            <p>{entry.shop.phone}</p>
                                        </div>

                                        <div className="mt-5 grid gap-2 sm:grid-cols-2">
                                            <button
                                                type="button"
                                                onClick={() => setContactEntry(entry)}
                                                className="rounded-xl border border-[#0e1b3a] bg-[#0e1b3a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#152d66]"
                                            >
                                                Contact Salon
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setConfirmDeleteEntry(entry)}
                                                className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
                                            >
                                                Remove Queue
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                </main>
            </div>

            <Modal show={Boolean(contactEntry)} onClose={closeContactModal} maxWidth="md">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2d3e52]">Contact Salon</h3>
                    <p className="mt-1 text-sm text-[#5c7291]">{contactEntry?.shop?.shop_name}</p>

                    <div className="mt-4 rounded-xl border border-[#b9c7db] bg-[#eef3fb] p-4">
                        <p className="text-sm font-semibold uppercase tracking-wide text-[#5c7291]">Shop Phone Number</p>
                        <p className="mt-2 text-2xl font-bold text-[#0e1b3a]">
                            {contactEntry?.shop?.phone?.trim() || 'No phone number available.'}
                        </p>
                    </div>

                    <div className="mt-5">
                        <button
                            type="button"
                            onClick={copyPhoneNumber}
                            disabled={!contactEntry?.shop?.phone?.trim()}
                            className={`w-full rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${contactEntry?.shop?.phone?.trim()
                                ? 'bg-[#0e1b3a] hover:bg-[#152d66]'
                                : 'cursor-not-allowed bg-[#a0b0c5]'
                                }`}
                        >
                            {copiedPhone ? 'Phone copied' : 'Copy number'}
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={closeContactModal}
                        className="mt-3 w-full rounded-lg border border-[#d4dce6] px-4 py-2 text-sm font-semibold text-[#2d3e52] transition hover:bg-[#f5f7fa]"
                    >
                        Close
                    </button>
                </div>
            </Modal>

            <Modal show={Boolean(confirmDeleteEntry)} onClose={() => setConfirmDeleteEntry(null)} maxWidth="md">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2d3e52]">Remove Queue</h3>
                    <p className="mt-2 text-sm text-[#5c7291]">
                        Are you sure you want to remove your queue entry for {confirmDeleteEntry?.shop?.shop_name}?
                    </p>

                    <div className="mt-5 grid gap-2 sm:grid-cols-2">
                        <button
                            type="button"
                            onClick={() => setConfirmDeleteEntry(null)}
                            className="rounded-lg border border-[#d4dce6] px-4 py-2 text-sm font-semibold text-[#2d3e52] transition hover:bg-[#f5f7fa]"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={() => deleteQueue(confirmDeleteEntry?.entry_id)}
                            className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                        >
                            Yes, Remove Queue
                        </button>
                    </div>
                </div>
            </Modal>

            <ProfileMenuModal
                show={showProfileMenu}
                onClose={() => setShowProfileMenu(false)}
                userName={auth.user.name}
            />
        </>
    );
}
