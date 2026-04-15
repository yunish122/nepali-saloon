import { Head, Link } from '@inertiajs/react';

const roles = [
    {
        title: 'For Customers',
        subtitle: 'Discover and book salons effortlessly',
        points: [
            'Real-time queue tracking',
            'Find salons near you',
            'View ratings & reviews',
        ],
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <path d="M7.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.7" />
                <path d="M16.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.7" />
                <path d="M3 19.5c0-2.5 2.2-4.5 4.5-4.5s4.5 2 4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                <path d="M13 19.5c.2-1.9 1.7-3.4 3.5-3.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: 'For Staff',
        subtitle: 'Manage queue and services efficiently',
        points: [
            'Track queue position',
            'Manage service times',
            'Customer management',
        ],
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <path d="M6 3v6M18 15v6M14.5 5.5l-9 9M8.5 11.5l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 3h-3v3h3V3ZM9 18H6v3h3v-3Z" stroke="currentColor" strokeWidth="1.7" />
            </svg>
        ),
    },
    {
        title: 'For Owners',
        subtitle: 'Monitor and grow your business',
        points: ['Business analytics', 'Revenue tracking', 'Customer ratings'],
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
                <path d="M12 6v14M3 11h18" stroke="currentColor" strokeWidth="1.7" />
            </svg>
        ),
    },
];

export default function Welcome({ auth, canLogin, canRegister }) {
    return (
        <>
            <Head title="SalonHub" />

            <div className="min-h-screen bg-[#eef2f6] text-[#314361]">
                <header className="border-b border-[#d4dce6]">
                    <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4 sm:px-8">
                        <div className="flex items-center gap-3">
                            <div className="grid h-9 w-9 place-items-center rounded-md bg-[#0e1b3a] text-sm font-semibold text-[#5a78a8]">
                                S
                            </div>
                            <span className="text-3xl font-semibold tracking-tight">SalonHub</span>
                        </div>

                        {canLogin && (
                            <div>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex rounded-xl border border-[#0f2046] bg-[#0f2046] px-5 py-2 text-xl font-semibold text-white transition hover:bg-[#152d66]"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="inline-flex rounded-xl border border-[#0f2046] bg-[#0f2046] px-5 py-2 text-xl font-semibold text-white transition hover:bg-[#152d66]"
                                    >
                                        Sign In
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </header>

                <main className="mx-auto w-full max-w-[1200px] px-6 pb-10 pt-20 sm:px-8 sm:pt-28">
                    <section className="text-center">
                        <h1 className="text-balance text-5xl font-bold leading-tight text-[#374861] sm:text-6xl md:text-7xl">
                            Queue Management for Salons
                        </h1>
                        <p className="mx-auto mt-8 max-w-3xl text-xl text-[#607695] sm:text-3xl">
                            Real-time queue tracking, seamless bookings, and analytics for salons across Nepal.
                        </p>

                        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:mt-14">
                            <Link
                                href={route('login')}
                                className="inline-flex min-w-[180px] justify-center rounded-xl border border-[#0f2046] bg-[#0f2046] px-8 py-3 text-xl font-semibold text-white transition hover:bg-[#152d66]"
                            >
                                Get Started
                            </Link>

                            <button
                                type="button"
                                className="inline-flex min-w-[180px] justify-center rounded-xl border border-[#cdd7e4] bg-[#f1f5fb] px-8 py-3 text-xl font-semibold text-[#2d405e] transition hover:bg-[#e6edf8]"
                            >
                                Learn More
                            </button>
                        </div>
                    </section>

                    <section className="mt-28 text-center">
                        <h2 className="text-4xl font-bold text-[#3b4d68] sm:text-5xl">Tailored for Every Role</h2>
                        <p className="mt-5 text-xl text-[#607695] sm:text-3xl">
                            Features designed for customers, staff, and owners
                        </p>

                        <div className="mt-12 grid gap-6 lg:grid-cols-3">
                            {roles.map((role) => (
                                <article key={role.title} className="rounded-2xl border border-[#d4dce6] bg-[#edf2f7] p-7 text-left">
                                    <div className="text-[#667d9f]">{role.icon}</div>
                                    <h3 className="mt-4 text-4xl font-bold text-[#2f415f]">{role.title}</h3>
                                    <p className="mt-5 text-xl text-[#607695]">{role.subtitle}</p>
                                    <ul className="mt-7 space-y-3 text-xl text-[#3f5473]">
                                        {role.points.map((point) => (
                                            <li key={point}>{point}</li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="mt-20 rounded-2xl border border-[#d4dce6] bg-[#edf2f7] px-6 py-16 text-center sm:px-10">
                        <h2 className="text-4xl font-bold text-[#36475f] sm:text-5xl">Ready to transform your salon?</h2>
                        <p className="mx-auto mt-6 max-w-4xl text-xl text-[#607695] sm:text-3xl">
                            Join salons across Nepal with better queue management and customer satisfaction.
                        </p>
                        <Link
                            href={route('login')}
                            className="mt-9 inline-flex rounded-xl border border-[#0f2046] bg-[#0f2046] px-10 py-3 text-xl font-semibold text-white transition hover:bg-[#152d66]"
                        >
                            Get Started
                        </Link>
                    </section>
                </main>

                <footer className="border-t border-[#d4dce6]">
                    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                        <div className="flex items-center gap-3">
                            <div className="grid h-9 w-9 place-items-center rounded-md bg-[#0e1b3a] text-sm font-semibold text-[#5a78a8]">
                                S
                            </div>
                            <span className="text-3xl font-semibold tracking-tight">SalonHub</span>
                        </div>
                        <p className="text-lg text-[#607695]">Queue Management for Salons · Nepal</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
