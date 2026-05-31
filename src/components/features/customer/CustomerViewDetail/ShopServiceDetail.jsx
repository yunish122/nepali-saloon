import { Clock, Star, MapPin, Phone, Users } from "lucide-react"
function ShopServiceDetail({shop_name, location, opening_time, closing_time, phone,avg_duration, shopStatus}){
    return(
        <div className="mx-auto w-full">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start">
                    <div>
                        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-200">
                            <img src="https://picsum.photos/seed/salon/800/600" alt="Salon" className="w-full object-cover" />

                        </div>
                    </div>

                    <div className="pt-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold text-slate-800">{shop_name}</h1>
                                <p className="mt-1 text-sm text-slate-500">{location}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <Star size={14} className="text-amber-400" />
                                    <p className="text-sm font-semibold">4.7 <span className="text-slate-400 font-normal">(312 reviews)</span></p>
                                </div>
                            </div>

                            <div>
                                <button className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm text-emerald-700 font-semibold">Open</button>
                            </div>
                        </div>

                        <div className="my-3 h-px bg-slate-100" />

                        <div className="space-y-3 text-slate-700">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-600">
                                    <Clock size={14} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">{opening_time} - {closing_time}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-600">
                                    <MapPin size={14} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">{location}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-600">
                                    <Phone size={14} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">{phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="flex items-center justify-center rounded-xl border border-slate-100 bg-white px-4 py-6 shadow-[0_6px_20px_rgba(2,6,23,0.04)]">
                                    <div className="text-center">
                                        <div className="mb-1 flex items-center justify-center text-slate-600">
                                            <Users size={16} />
                                        </div>
                                        <p className="text-2xl font-bold text-slate-800">3</p>
                                        <p className="mt-1 text-xs text-slate-400">In Queue</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center rounded-xl border border-slate-100 bg-white px-4 py-6 shadow-[0_6px_20px_rgba(2,6,23,0.04)]">
                                    <div className="text-center">
                                        <div className="mb-1 flex items-center justify-center text-slate-600">
                                            <Clock size={16} />
                                        </div>
                                        <p className="text-2xl font-bold text-slate-800">~{avg_duration}</p>
                                        <p className="mt-1 text-xs text-slate-400">Wait Time</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default ShopServiceDetail