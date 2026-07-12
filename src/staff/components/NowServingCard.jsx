function NowServingCard({ nowServing, onComplete, isCompleting }) {
    if (!nowServing) {
        return (
            <section className="rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-white p-6 shadow-sm">
                <p className="text-sm font-medium text-violet-700">Now Serving</p>
                <p className="mt-2 text-lg font-semibold text-slate-700">No customer is currently being served.</p>
            </section>
        );
    }

    return (
        <section className="rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-sm font-medium text-violet-700">Now Serving</p>
                    <p className="mt-1 text-4xl font-bold text-slate-900">#{nowServing.position}</p>
                </div>
                <div className="grid flex-1 gap-1 text-sm text-slate-600 md:grid-cols-3 md:gap-8">
                    <div>
                        <p className="font-semibold text-slate-800">Customer</p>
                        <p>{nowServing.customer_name}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-slate-800">Contact</p>
                        <p>{nowServing.phone || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-slate-800">Services</p>
                        <p className="text-violet-700">{nowServing.service_name || `${nowServing.services_count} services`}</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => onComplete?.(nowServing.id)}
                    disabled={isCompleting}
                    className="shrink-0 rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isCompleting ? 'Finishing...' : 'Finish Serving'}
                </button>
            </div>
        </section>
    );
}

export default NowServingCard;
