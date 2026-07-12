function CompletedQueuePanel({ entries }) {
    return (
        <section className="rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
                <h2 className="text-xl font-semibold text-slate-800">Completed Services</h2>
                <p className="mt-1 text-sm text-slate-500">Today&apos;s completed services.</p>
            </div>

            {entries.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                    <div className="text-3xl">🎉</div>
                    <p className="mt-3 text-sm font-medium text-slate-500">No completed services yet</p>
                </div>
            ) : (
                <div className="divide-y divide-slate-100">
                    {entries.map((entry) => (
                        <div key={entry.id} className="flex items-center justify-between px-6 py-4">
                            <div>
                                <p className="font-semibold text-slate-800">{entry.customer_name}</p>
                                <p className="text-sm text-slate-500">{entry.service_name}</p>
                            </div>
                            <p className="text-xs text-slate-400">{entry.phone || 'N/A'}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default CompletedQueuePanel;
