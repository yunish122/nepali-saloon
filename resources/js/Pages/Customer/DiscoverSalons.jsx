import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import ProfileMenuModal from '../../Components/ProfileMenuModal';

export default function DiscoverSalons({ auth, shops }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const filteredShops = shops.filter((shop) => {
        const matchesSearch = shop.shop_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = !selectedLocation || shop.location === selectedLocation;
        return matchesSearch && matchesLocation;
    });

    const locations = [...new Set(shops.map((s) => s.location))];

    const getShopStatus = (shop) => {
        const now = new Date();
        const [openHour, openMin] = shop.opening_time.split(':').map(Number);
        const [closeHour, closeMin] = shop.closing_time.split(':').map(Number);

        const openTime = new Date(now);
        openTime.setHours(openHour, openMin, 0);

        const closeTime = new Date(now);
        closeTime.setHours(closeHour, closeMin, 0);

        return now >= openTime && now <= closeTime ? 'Open' : 'Closed';
    };

    return (
        <>
            <Head title="Discover Salons" />

            <div className="min-h-screen bg-[#f5f7fa]">
                {/* Header */}
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
                                <Link href="/discover-salons" className="text-sm font-semibold text-[#0e1b3a]">
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
                        <Link href="/discover-salons" className="rounded-lg bg-[#e9eef6] px-3 py-1.5 text-sm font-semibold text-[#0e1b3a]">
                            Salons
                        </Link>
                        <Link href="/my-queue" className="rounded-lg px-3 py-1.5 text-sm text-[#6d819c]">
                            My Queue
                        </Link>
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6">
                    {/* Hero Section */}
                    <section className="mb-8">
                        <h1 className="text-3xl font-bold text-[#2d3e52] sm:text-4xl">Discover Salons</h1>
                        <p className="mt-2 text-base text-[#7a8fa3] sm:text-lg">Browse salons and check real-time queue status</p>
                    </section>

                    {/* Search & Filter */}
                    <section className="mb-8 grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#2d3e52]">SEARCH</label>
                            <div className="relative">
                                <svg
                                    className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7a8fa3]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Elegance Salon, Royal Beauty..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-lg border border-[#d4dce6] bg-white py-2.5 pl-10 pr-4 text-sm text-[#2d3e52] placeholder-[#a0b0c5] focus:border-[#0e1b3a] focus:outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#2d3e52]">LOCATION</label>
                            <div className="relative">
                                <svg
                                    className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7a8fa3]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <select
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                    className="w-full appearance-none rounded-lg border border-[#d4dce6] bg-white py-2.5 pl-10 pr-10 text-sm text-[#2d3e52] focus:border-[#0e1b3a] focus:outline-none"
                                >
                                    <option value="">All Locations</option>
                                    {locations.map((location) => (
                                        <option key={location} value={location}>
                                            {location}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Salons Grid */}
                    <section>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredShops.map((shop) => {
                                const status = getShopStatus(shop);
                                const isOpen = status === 'Open';

                                return (
                                    <div
                                        key={shop.id}
                                        className="overflow-hidden rounded-xl border border-[#d4dce6] bg-white shadow-sm transition hover:shadow-lg"
                                    >
                                        {/* Image Placeholder */}
                                        <div className="relative h-40 bg-gradient-to-br from-[#d4dce6] to-[#c5cfe0] sm:h-44">
                                            <div className="absolute right-4 top-4">
                                                <span
                                                    className={`inline-block rounded-full px-4 py-1 text-sm font-semibold ${isOpen
                                                        ? 'bg-[#d4f5e6] text-[#00a86b]'
                                                        : 'bg-[#f5d4d4] text-red-600'
                                                        }`}
                                                >
                                                    {status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            <h3 className="text-xl font-bold text-[#2d3e52]">{shop.shop_name}</h3>
                                            <div className="mt-2 flex items-center gap-2">
                                                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-sm font-semibold text-[#2d3e52]">4.8</span>
                                                <span className="text-sm text-[#7a8fa3]">234 reviews</span>
                                            </div>

                                            {/* Details */}
                                            <div className="mt-4 space-y-2 text-sm text-[#7a8fa3]">
                                                <div className="flex items-center gap-3">
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    </svg>
                                                    <span>{shop.location}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>
                                                        {shop.opening_time.slice(0, 5)} - {shop.closing_time.slice(0, 5)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <span>{shop.phone}</span>
                                                </div>
                                            </div>

                                            {/* Queue Info */}
                                            <div className="mt-4 flex items-center justify-between border-t border-[#d4dce6] pt-4">
                                                <div>
                                                    <p className="text-sm text-[#7a8fa3]">5 in queue</p>
                                                    <p className="text-lg font-bold text-[#2d3e52]">~45 min</p>
                                                </div>
                                                <div>
                                                    <span
                                                        className={`inline-block rounded-lg px-4 py-2 text-sm font-semibold ${isOpen
                                                            ? 'bg-[#d4f5e6] text-[#00a86b]'
                                                            : 'bg-[#f5d4d4] text-red-600'
                                                            }`}
                                                    >
                                                        {status}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* View Details Button */}
                                            {isOpen ? (
                                                <Link
                                                    href={`/shops/${shop.id}`}
                                                    className="mt-4 block w-full rounded-lg border border-[#0e1b3a] bg-[#0e1b3a] py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#152d66]"
                                                >
                                                    View Details
                                                </Link>
                                            ) : (
                                                <button
                                                    className="mt-4 w-full cursor-not-allowed rounded-lg border border-[#a0b0c5] bg-[#a0b0c5] py-2.5 text-center text-sm font-semibold text-white"
                                                    disabled
                                                >
                                                    Closed
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </main>
            </div >

            <ProfileMenuModal
                show={showProfileMenu}
                onClose={() => setShowProfileMenu(false)}
                userName={auth.user.name}
            />
        </>
    );
}
