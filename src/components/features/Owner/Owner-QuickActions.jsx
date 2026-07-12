import { Link } from 'react-router-dom';

function OwnerQuickActions({
    actions = [
        { key: 'manage_services', label: 'Manage Services', path: '/owner/services' },
    ],
    bottomAction = { key: 'settings', label: 'Salon Settings', path: '/owner/settings' },
}) {
    return (
        <aside className="relative group rounded-2xl flex-1 flex flex-col border border-slate-100 bg-white p-6 shadow-sm min-h-[420px]">
            <div className="pb-28">
                <header className="mb-6">
                    <h3 className="text-xl font-semibold text-slate-800">Quick Actions</h3>
                </header>

                <div className="space-y-4">
                    {actions.map((action) => (
                        <Link
                            key={action.key}
                            to={action.path}
                            className="block w-full rounded-[12px] border border-slate-100 bg-slate-50 px-6 py-4 text-left font-medium text-slate-800 transition-colors duration-150 hover:bg-slate-100"
                        >
                            {action.label}
                        </Link>
                    ))}
                </div>
            </div>

            <Link
                to={bottomAction.path}
                className="absolute bottom-6 left-6 right-6 block rounded-[12px] border border-slate-100 bg-slate-50 px-6 py-4 text-left font-medium text-slate-800 transition-colors duration-150 hover:bg-slate-100"
            >
                {bottomAction.label}
            </Link>
        </aside>
    );
}

export default OwnerQuickActions;
