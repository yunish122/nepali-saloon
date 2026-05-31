import { useState } from 'react';
import { MapPin, Clock, Phone, Trash, X } from 'lucide-react';
import Button from '../../../ui/Button';
function CustomerQueueGrid() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const salonPhone = '+977 1-4123456';

    return (
        <section className="relative w-full max-w-4xl">
            <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                <div className="flex items-start justify-between gap-4 bg-slate-100/80 px-6 py-5 sm:px-8">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-800">Elegance Salon</h2>
                        <p className="mt-1 text-sm text-slate-500">Kathmandu</p>
                    </div>

                    <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm">
                        Waiting
                    </span>
                </div>

                <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-center shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                            <p className="text-sm font-medium text-slate-800">Queue Position</p>
                            <p className="mt-2 text-4xl font-bold tracking-tight text-slate-800">#1</p>
                        </div>

                        <div className="rounded-2xl border px-4 py-6 text-center shadow-[0_8px_20px_rgba(124,58,237,0.08)]">
                            <p className="text-sm font-medium text-slate-500">Service</p>
                            <p className="mt-2 text-2xl text-slate-500 font-semibold ">Hair Cut</p>
                            <p className="mt-1 text-sm text-slate-500">Selected for this visit</p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                            <p className="text-sm font-medium text-slate-800">Cost</p>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-800">Rs. 500</p>
                        </div>
                    </div>


                    <div className="grid gap-4 border-y border-slate-200 py-5 sm:grid-cols-3">
                        <div className="flex items-center gap-3 text-slate-700">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-slate-400">Location</p>
                                <p className="text-sm font-medium">Thamel, Kathmandu</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-slate-700">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                <Clock size={18} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-slate-400">Hours</p>
                                <p className="text-sm font-medium">09:00 - 19:00</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-slate-700">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                <Phone size={18} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-slate-400">Phone</p>
                                <p className="text-sm font-medium">+977 1-4123456</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                            type="button"
                            title="Contact Salon"
                            size='md'
                            onClick={() => setIsContactOpen(true)}
                            className='inline-flex w-full items-center justify-center gap-2 hover:cursor-pointer rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800'
                        />
                        <button className='inline-flex h-12 w-12 items-center justify-center rounded-xl hover:cursor-pointer bg-red-500 text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 hover:bg-red-600'>
                            <Trash size={18} />
                        </button>
                    </div>
                </div>
            </article>

            {isContactOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4"
                    onClick={() => setIsContactOpen(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="contact-salon-title"
                        className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.25)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Contact Salon</p>
                                <h3 id="contact-salon-title" className="mt-1 text-xl font-semibold text-slate-900">
                                    Elegance Salon
                                </h3>
                            </div>

                            <button
                                type="button"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
                                onClick={() => setIsContactOpen(false)}
                                aria-label="Close contact popup"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                            <div className="flex items-center gap-3 text-slate-800">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-slate-400">Phone Number</p>
                                    <p className="text-lg font-semibold">{salonPhone}</p>
                                </div>
                            </div>
                        </div>

                        <p className="mt-4 text-sm text-slate-500">
                            Tap the number to copy it or call the salon directly.
                        </p>

                        <a
                            href={`tel:${salonPhone.replace(/\s+/g, '')}`}
                            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Call Now
                        </a>
                    </div>
                </div>
            )}
        </section>
    )
}
export default CustomerQueueGrid