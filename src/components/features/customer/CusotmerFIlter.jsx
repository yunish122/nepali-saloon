
import { Search } from 'lucide-react';
import { MapPin } from 'lucide-react';

function CustomerFilter() {
    return (
        <section className="flex items-center w-full gap-4 mt-3  ">
            {/* left search filter */}
            <div className="flex flex-col flex-1 w-full items-start justify-start w-full gap-1">
                <span className="text-xs font-semibold text-gray-900/70">Search</span>
                <div className='flex items-center gap-2 w-full bg-white px-3 py-1.5 border-slate-200 bg-white rounded-md border-1 focus-within:border-slate-400 focus-within:ring-1 focus-within:ring-slate-400 transition-all'>
                    <Search className='shrink-0 w-4 h-4 text-slate-500'></Search>
                    <input className="w-full bg-transparent outline-none border-gray-500/40 rounded-md" type="text" placeholder="Abc Saloon..." />

                </div>
            </div>

            <div className="flex flex-col flex-1 w-full items-start justify-start gap-1">
                <span className="text-xs font-semibold text-gray-900/70">Location</span>
                <div className='flex items-center gap-2 bg-white px-3 py-1.5 w-full border-slate-200 bg-white rounded-md border-1 focus-within:border-slate-400 focus-within:ring-1 focus-within:ring-slate-400 transition-all'>
                    <MapPin className='shrink-0 w-4 h-4 text-slate-500'></MapPin>
                    <select className="w-full bg-transparent outline-none px-3 border-gray-500/40 rounded-md" defaultValue={"kathmandu"} >
                        <option value="all">All location</option>
                        <option value="lalitpur">Lalitpur</option>
                        <option value="kathmandu">Kathmandu</option>
                    </select>

                </div>
            </div>
        </section>
    )
}

export default CustomerFilter