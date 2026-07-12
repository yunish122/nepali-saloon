import { formatWaitTime } from '../utils/formatWaitTime';

function ActiveQueueTable({ entries, onServe, onSkip }) {
    return (
        <section className="rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
                <h2 className="text-xl font-semibold text-slate-800">Active Queue</h2>
                <p className="mt-1 text-sm text-slate-500">Manage customer queue and service times.</p>
            </div>

            {entries.length === 0 ? (
                <div className="px-6 py-12 text-center text-sm text-slate-500">
                    No customers are waiting in the queue.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Position</th>
                                <th className="px-6 py-3 font-semibold">Customer</th>
                                <th className="px-6 py-3 font-semibold">Phone</th>
                                <th className="px-6 py-3 font-semibold">Wait Time</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                                <th className="px-6 py-3 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry) => (
                                <tr key={entry.id} className="border-b border-slate-100 last:border-b-0">
                                    <td className="px-6 py-4 font-semibold text-slate-800">#{entry.position}</td>
                                    <td className="px-6 py-4 text-slate-700">{entry.customer_name}</td>
                                    <td className="px-6 py-4 text-slate-600">{entry.phone || 'N/A'}</td>
                                    <td className="px-6 py-4 text-slate-600">{formatWaitTime(entry.wait_minutes)}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                            Waiting
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <button
                                                type="button"
                                                onClick={() => onServe(entry.id)}
                                                className="font-semibold text-violet-700 hover:text-violet-900"
                                            >
                                                Serve
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onSkip(entry.id)}
                                                className="font-semibold text-slate-500 hover:text-slate-700"
                                            >
                                                Skip
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export default ActiveQueueTable;
