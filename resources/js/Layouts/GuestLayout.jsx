import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f7fa] px-6 py-8">
            <div className="mb-8 text-center">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-[#0e1b3a] text-sm font-semibold text-[#5a78a8]">
                    S
                </div>
                <h1 className="text-4xl font-bold text-[#2d3e52]">SalonHub</h1>
                <p className="mt-2 text-lg text-[#7a8fa3]">Queue Management System</p>
            </div>

            <div className="w-full overflow-hidden rounded-2xl bg-white px-8 py-10 shadow-lg sm:max-w-md">
                {children}
            </div>
        </div>
    );
}
