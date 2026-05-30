import Button from '../../ui/Button';

function OwnerQuickActions({
    actions = [
        { key: 'manage_services', label: 'Manage Services' },
        { key: 'view_ratings', label: 'View Ratings' },
        { key: 'payment_history', label: 'Payment History' },
    ],
    bottomAction = { key: 'settings', label: 'Salon Settings' },
}) {
    return (
        <aside className="relative group rounded-2xl flex-1 flex flex-col border border-slate-100 bg-white p-6 shadow-sm min-h-[420px]">
            <div className="pb-28">
                <header className="mb-6">
                    <h3 className="text-xl font-semibold text-slate-800">Quick Actions</h3>
                </header>

                <div className="space-y-4">
                    {actions.map((a) => (
                        <Button
                            key={a.key}
                            title={a.label}
                            size="md"
                            className="w-full text-left rounded-[12px] bg-slate-50 px-6 py-4 text-slate-800 font-medium border border-slate-100 transition-colors duration-150 hover:bg-slate-100"
                        />
                    ))}
                </div>
            </div>

            <div className="absolute left-6 right-6 bottom-6">
                <Button
                    title={bottomAction.label}
                    size="md"
                    className="w-full text-left rounded-[12px] bg-slate-50 px-6 py-4 text-slate-800 font-medium border border-slate-100 transition-colors duration-150 hover:bg-slate-100"
                />
            </div>
        </aside>
    );
}

export default OwnerQuickActions;
