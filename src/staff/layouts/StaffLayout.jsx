import StaffHeader from '../components/StaffHeader';

function StaffLayout({ shopName, children }) {
    return (
        <div className="min-h-screen bg-slate-50">
            <StaffHeader shopName={shopName} />
            <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:px-6">
                {children}
            </main>
        </div>
    );
}

export default StaffLayout;
