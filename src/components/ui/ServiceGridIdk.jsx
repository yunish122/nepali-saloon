import { Check } from 'lucide-react';
import Button from './Button';

function ServiceGridIdk({ cost, duration, serviceName, selected, onJoinQueue }) {
    return (
        <article className={`rounded-xl border p-4 transition ${selected ? 'border-emerald-400 bg-emerald-50/50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="font-semibold text-slate-800">{serviceName}</h3>
                    <p className="mt-1 text-sm text-slate-500">NPR {cost}</p>
                    <p className="mt-1 text-xs text-slate-400">Estimated duration: {duration} min</p>
                </div>
                {selected && <Check className="h-5 w-5 shrink-0 text-emerald-600" aria-label="Selected service" />}
            </div>
            <Button
                title="Join Queue"
                onClick={onJoinQueue}
                aria-pressed={selected}
                className="mt-4 w-full rounded-lg bg-slate-800 py-2 text-white transition hover:bg-slate-700"
            />
        </article>
    );
}

export default ServiceGridIdk;
