import { Star } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Phone } from 'lucide-react';
import Button from '../../ui/Button';
import { Link } from 'react-router-dom';
function CustomerSaloonGrid({ shopName = 'Elegance Salon', location = 'Kathmandu', phNumber = '+977 1-4123456', totalQueue = 5, duration = '45 mins', queueStatus = 'Open', ratings = '4.2', reviewCount = 231 }) {
    return (
        <div className="max-w-xs bg-white flex flex-col justify-between border border-slate-200 shadow-md rounded-xl overflow-hidden">
            <div className="relative w-full h-40">
                <img src="https://picsum.photos/seed/salon/800/600" alt="Salon" className="w-full h-full object-cover" />
                <span className={`absolute top-3 right-3 text-xs font-medium px-3 py-1 rounded-full ${queueStatus === 'Open' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'}`}>{queueStatus}</span>
            </div>

            <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{shopName}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{location}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-semibold">{ratings}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                    <div className="flex flex-col">
                        <span className="text-xs">In queue</span>
                        <strong className="text-sm text-gray-900">{totalQueue}</strong>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs">Est. wait</span>
                        <strong className="text-sm text-gray-900">{duration}</strong>
                    </div>
                </div>

                <div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600" style={{ width: '90%' }}></div>
                    </div>
                    <div className="text-right text-xs text-gray-400 mt-1">Queue progress</div>
                </div>

                <div className="flex gap-2">
                    <Link to={'/viewDetailsShop'}><Button title="View Details" size="sm" className="hover:cursor-pointer flex-1 bg-black text-white rounded-md" /></Link>
                    <Button title="Contact" size="sm" className="bg-white border hover:cursor-pointer border-slate-200 text-gray-700 rounded-md" />
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-600 pt-3 border-t border-slate-100 mt-2">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>09:00 - 19:00</span>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        <Phone className="w-4 h-4" />
                        <span>{phNumber}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerSaloonGrid;