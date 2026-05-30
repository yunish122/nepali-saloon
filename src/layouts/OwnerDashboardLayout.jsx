import OwnerQuickActions from "../components/features/Owner/Owner-QuickActions"
import OwnerAnalyticGrid from "../components/features/Owner/OwnerAnalyticsGrid"
import QueueSummary from "../components/features/Owner/QueueSummary"

function OwnerDashboardLayout(){
    return(
        <div className="grid grid-cols-2 gap-8 ">
            <QueueSummary></QueueSummary>
            <OwnerQuickActions></OwnerQuickActions>
        </div>
    )
}

export default OwnerDashboardLayout