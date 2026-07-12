import { useState } from 'react';
import ActiveQueueTable from '../components/ActiveQueueTable';
import CompletedQueuePanel from '../components/CompletedQueuePanel';
import NowServingCard from '../components/NowServingCard';
import ServiceSettingsPanel from '../components/ServiceSettingsPanel';
import StaffStatsGrid from '../components/StaffStatsGrid';
import StaffTabNav from '../components/StaffTabNav';
import { STAFF_TABS } from '../constants/staffTabs';
import { useStaffDashboard } from '../hooks/useStaffDashboard';
import { useStaffQueueActions } from '../hooks/useStaffQueueActions';
import StaffLayout from '../layouts/StaffLayout';

function StaffDashboardPage() {
    const [activeTab, setActiveTab] = useState(STAFF_TABS.ACTIVE);
    const [isCompleting, setIsCompleting] = useState(false);
    const {
        dashboard,
        activeEntries,
        completedEntries,
        services,
        isLoading,
        error,
        refreshAll,
        setServices,
    } = useStaffDashboard(activeTab);

    const {
        actionError,
        isSavingSettings,
        settingsMessage,
        handleServe,
        handleSkip,
        handleComplete,
        handleToggleSalonStatus,
        handleSaveDurations,
    } = useStaffQueueActions({ onSuccess: refreshAll });

    const salonOpen = Number(dashboard?.shop?.status) === 1;

    function handleServiceDurationChange(index, duration) {
        setServices((current) =>
            current.map((service, serviceIndex) =>
                serviceIndex === index ? { ...service, duration } : service,
            ),
        );
    }

    async function handleFinishServing(entryId) {
        setIsCompleting(true);

        try {
            await handleComplete(entryId);
        } finally {
            setIsCompleting(false);
        }
    }

    if (isLoading) {
        return (
            <StaffLayout>
                <div className="flex min-h-[50vh] items-center justify-center text-sm text-slate-500">
                    Loading staff dashboard...
                </div>
            </StaffLayout>
        );
    }

    if (error && !dashboard) {
        return (
            <StaffLayout>
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            </StaffLayout>
        );
    }

    return (
        <StaffLayout shopName={dashboard?.shop?.shop_name}>
            <section>
                <h1 className="text-3xl font-semibold text-slate-900">{dashboard?.shop?.shop_name}</h1>
                <p className="mt-1 text-sm text-slate-500">Real-time queue management dashboard</p>
            </section>

            <NowServingCard
                nowServing={dashboard?.now_serving}
                onComplete={handleFinishServing}
                isCompleting={isCompleting}
            />

            <StaffStatsGrid
                stats={dashboard?.stats}
                salonOpen={salonOpen}
                onToggleSalonStatus={handleToggleSalonStatus}
            />

            <StaffTabNav activeTab={activeTab} onChange={setActiveTab} />

            {(error || actionError) && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {actionError || error}
                </div>
            )}

            {activeTab === STAFF_TABS.ACTIVE && (
                <ActiveQueueTable entries={activeEntries} onServe={handleServe} onSkip={handleSkip} />
            )}

            {activeTab === STAFF_TABS.COMPLETED && (
                <CompletedQueuePanel entries={completedEntries} />
            )}

            {activeTab === STAFF_TABS.SETTINGS && (
                <ServiceSettingsPanel
                    services={services}
                    onChange={handleServiceDurationChange}
                    onSave={() => handleSaveDurations(services)}
                    isSaving={isSavingSettings}
                    saveMessage={settingsMessage}
                />
            )}
        </StaffLayout>
    );
}

export default StaffDashboardPage;
