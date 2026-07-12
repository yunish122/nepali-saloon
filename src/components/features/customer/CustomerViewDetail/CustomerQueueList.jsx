import { Clock, Users } from 'lucide-react';

function CustomerQueueList({ queueEntries, estimatedWaitMinutes }) {
    return (
        <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-4 md:p-6">
                <h2 className="text-lg font-semibold text-slate-800">Current queue</h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"><Users className="h-5 w-5 text-slate-600" /><div><p className="text-lg font-semibold text-slate-800">{queueEntries.length}</p><p className="text-xs text-slate-500">Currently waiting</p></div></div>
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"><Clock className="h-5 w-5 text-slate-600" /><div><p className="text-lg font-semibold text-slate-800">~{estimatedWaitMinutes} min</p><p className="text-xs text-slate-500">Estimated wait time</p></div></div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead><tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500"><th className="px-4 py-3 md:px-6">Position</th><th className="px-4 py-3 md:px-6">Customer</th><th className="px-4 py-3 md:px-6">Estimated wait</th><th className="px-4 py-3 text-right md:px-6">Status</th></tr></thead>
                    <tbody className="divide-y divide-slate-100">
                        {queueEntries.map((entry, index) => (
                            <tr key={entry.id} className="text-sm text-slate-700">
                                <td className="px-4 py-4 md:px-6"><span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-semibold">{index + 1}</span></td>
                                <td className="px-4 py-4 font-medium md:px-6">{entry.customer}</td>
                                <td className="px-4 py-4 md:px-6">{entry.waitMinutes === 0 ? 'Being served' : `~${entry.waitMinutes} min`}</td>
                                <td className="px-4 py-4 text-right md:px-6"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${entry.status === 'In progress' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{entry.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default CustomerQueueList;
