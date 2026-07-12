import { CheckCircle2, Clock3, Sparkles, Users } from 'lucide-react';

function StatCard({ label, value, icon: Icon, iconClassName, badge }) {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
                    {badge ? (
                        <span className="mt-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                            {badge}
                        </span>
                    ) : (
                        <p className="mt-2 text-3xl font-semibold text-slate-800">{value}</p>
                    )}
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconClassName}`}>
                    <Icon className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
}

function StaffStatsGrid({ stats, salonOpen, onToggleSalonStatus }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="In Queue" value={stats?.in_queue ?? 0} icon={Users} iconClassName="bg-slate-100 text-slate-600" />
            <StatCard label="Completed" value={stats?.completed_today ?? 0} icon={CheckCircle2} iconClassName="bg-emerald-100 text-emerald-600" />
            <StatCard label="Avg Wait" value={`${stats?.avg_wait_minutes ?? 0} min`} icon={Clock3} iconClassName="bg-amber-100 text-amber-600" />
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Salon Status</p>
                        <button
                            type="button"
                            onClick={() => onToggleSalonStatus?.(!salonOpen)}
                            className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold transition ${
                                salonOpen
                                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                        >
                            {salonOpen ? 'Open' : 'Closed'}
                        </button>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                        <Sparkles className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StaffStatsGrid;
