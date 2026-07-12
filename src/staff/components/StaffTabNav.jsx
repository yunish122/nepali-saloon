import { STAFF_TAB_LABELS } from '../constants/staffTabs';

function StaffTabNav({ activeTab, onChange }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-100 p-1">
            <div className="grid grid-cols-3 gap-1">
                {STAFF_TAB_LABELS.map((tab) => {
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => onChange(tab.id)}
                            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                                isActive
                                    ? 'bg-white text-violet-700 shadow-sm'
                                    : 'text-slate-600 hover:text-slate-800'
                            }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default StaffTabNav;
