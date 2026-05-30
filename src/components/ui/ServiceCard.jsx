import Button from './Button';
import { Pencil, Trash, TrendingUp } from 'lucide-react';
import StatBox from './ServiceBox';
function PriorityPill({ level = 'low' }) {
    const map = {
        low: 'bg-emerald-100 text-emerald-700',
        medium: 'bg-yellow-100 text-amber-700',
        high: 'bg-rose-100 text-rose-700',
    };
    return (
        <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${map[level] || map.low}`}>
            {level}
        </div>
    );
}



function ServiceCard({
    title = 'Hair Cut',
    price = 'Rs. 500',
    duration = '30 min',
    priority = 'high',
    demandText = 'Adjust based on bookings',
    onEdit,
    onDelete,
}) {
    return (
        <article className="group max-w-xl relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-150 hover:-translate-y-0.5 hover:border-violet-300">
            <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
                <PriorityPill level={priority} />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
                <StatBox label="Price" value={price} />
                <StatBox label="Duration" value={duration} />
            </div>

            <div className="mt-6 rounded-lg bg-slate-300/40 px-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-slate-600">
                        <TrendingUp size={18} />
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-slate-800">Demand Level</p>
                        <p className="text-xs text-slate-500">{demandText}</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4">
                <div className="flex gap-4">
                    <Button
                        type="button"
                        onClick={onEdit}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-white border border-slate-100 px-4 py-3 text-slate-700 font-medium shadow-sm hover:bg-slate-50"
                    >
                        <Pencil size={16} />
                        Edit
                    </Button>

                    <Button
                        type="button"
                        onClick={onDelete}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-red-700 px-4 py-3 text-white font-medium shadow-md hover:bg-rose-700"
                    >
                        <Trash size={16} />
                        Delete
                    </Button>
                </div>
            </div>
        </article>
    );
}

export default ServiceCard;
