function ServiceSettingsPanel({ services, onChange, onSave, isSaving, saveMessage }) {
    return (
        <section className="rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
                <h2 className="text-xl font-semibold text-slate-800">Service Settings</h2>
                <p className="mt-1 text-sm text-slate-500">Configure default service durations.</p>
            </div>

            <div className="divide-y divide-slate-100">
                {services.map((service, index) => (
                    <div key={service.id} className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="font-semibold text-slate-800">{service.service_name}</p>
                            <p className="text-sm text-slate-500">Rs. {Number(service.cost).toLocaleString()}</p>
                        </div>
                        <label className="flex items-center gap-2 text-sm text-slate-600">
                            <input
                                type="number"
                                min="1"
                                value={service.duration}
                                onChange={(event) => onChange(index, Number(event.target.value))}
                                className="w-20 rounded-lg border border-slate-200 px-3 py-2 text-center outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                            />
                            min
                        </label>
                    </div>
                ))}
            </div>

            <div className="border-t border-slate-100 px-6 py-5">
                {saveMessage && (
                    <p className="mb-3 text-sm font-medium text-emerald-600">{saveMessage}</p>
                )}
                <button
                    type="button"
                    onClick={onSave}
                    disabled={isSaving}
                    className="w-full rounded-xl bg-[#121b31] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0d1527] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </section>
    );
}

export default ServiceSettingsPanel;
