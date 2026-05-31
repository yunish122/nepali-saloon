import { User, Settings, LogOut } from 'lucide-react';

function LogOutModal() {
    return (
        <div className="absolute right-0 top-10 w-42 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_36px_rgba(15,23,42,0.14)]">
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 text-slate-400">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                    <User size={18} strokeWidth={1.8} />
                </div>
                <p className="text-sm font-medium text-slate-400">Priya Sharma</p>
            </div>

            <div className="border-t border-slate-200 px-1 py-1">
                <button
                    type="button"
                    className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left text-slate-700 transition hover:bg-slate-50"
                >
                    <Settings size={18} className="text-slate-500" strokeWidth={1.8} />
                    <span className="text-sm font-medium">Settings</span>
                </button>

                <div className="my-0.5 h-px bg-slate-200" />

                <button
                    type="button"
                    className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition hover:bg-red-50/60"
                >
                    <LogOut size={18} className="text-slate-500" strokeWidth={1.8} />
                    <span className="text-sm font-medium text-red-500">Logout</span>
                </button>
            </div>
        </div>
    );
}

export default LogOutModal;