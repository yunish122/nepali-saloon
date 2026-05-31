function QueueEntryCard({ name, phone, position, status }) {
    return (
        <div className="transform rounded-lg border border-slate-100 bg-slate-50 p-4 flex items-center justify-between shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-[0_12px_36px_rgba(99,102,241,0.08)]">
            <div>
                <p className="text-sm font-semibold text-slate-800">{name}</p>
                <p className="mt-1 text-xs text-slate-500">{phone}</p>
            </div>

            <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    #{position}
                </div>

                <div className="inline-flex items-center justify-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-sky-600 shadow-sm">
                    {status}
                </div>
            </div>
        </div>
    );
}
export default QueueEntryCard