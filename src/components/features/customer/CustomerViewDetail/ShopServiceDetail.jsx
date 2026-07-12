import { Clock, MapPin, Phone, Star, Users } from 'lucide-react';

function ShopServiceDetail({ shopId, shopName, location, openingTime, closingTime, phone, shopStatus, queueCount, estimatedWaitMinutes, rating, services = [] }) {
    const isOpen = shopStatus === 1;

    return (
        <section className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-200">
                    <img src={`https://picsum.photos/seed/salon-${shopId ?? shopName}/800/600`} alt={shopName ? `${shopName} interior` : 'Salon'} className="h-full w-full object-cover" />
                </div>

                <div>
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h1 className="text-2xl font-semibold text-slate-800">{shopName}</h1>
                            <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                                <Star size={16} className="fill-amber-400 text-amber-400" />
                                <span>{rating}</span>
                            </div>
                        </div>
                        <span className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${isOpen ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
                            {isOpen ? 'Open' : 'Closed'}
                        </span>
                    </div>

                    {services.length > 0 && (
                        <div className="mt-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Popular services</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {services.map((service) => (
                                    <span
                                        key={service.id}
                                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                                    >
                                        {service.service_name} · NPR {service.cost}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="my-5 h-px bg-slate-100" />

                    <div className="space-y-3 text-sm text-slate-600">
                        <div className="flex items-center gap-2"><Clock size={16} className="text-slate-500" /><span>{openingTime} - {closingTime}</span></div>
                        <div className="flex items-center gap-2"><MapPin size={16} className="text-slate-500" /><span>{location}</span></div>
                        <div className="flex items-center gap-2"><Phone size={16} className="text-slate-500" /><span>{phone}</span></div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-4 text-center">
                            <Users size={17} className="mx-auto text-slate-600" />
                            <p className="mt-1 text-2xl font-bold text-slate-800">{queueCount}</p>
                            <p className="text-xs text-slate-500">People waiting</p>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-4 text-center">
                            <Clock size={17} className="mx-auto text-slate-600" />
                            <p className="mt-1 text-2xl font-bold text-slate-800">~{estimatedWaitMinutes} min</p>
                            <p className="text-xs text-slate-500">Estimated wait</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ShopServiceDetail;
