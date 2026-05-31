function StatBox({ label, value }) {
    return (
        <div className="flex-1 rounded-lg bg-slate-400/50 px-6 py-6 text-center">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
        </div>
    );
}

export default StatBox