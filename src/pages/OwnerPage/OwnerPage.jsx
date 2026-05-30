import OwnerPageHeading from "../../components/features/Owner/OwnerPageHeading"
import OwnerAnalyticCard from "../../components/ui/OwnerAnalyticCard"
import OwnerAnalyticGrid from "../../components/features/Owner/OwnerAnalyticsGrid"
import QueueSummary from "../../components/features/Owner/QueueSummary"
import OwnerQuickActions from "../../components/features/Owner/Owner-QuickActions"
import OwnerDashboardLayout from "../../layouts/OwnerDashboardLayout"
import Navbar from "../../components/Navbar"

function OwnerPage(){
    return(
        <div>
            <Navbar></Navbar>
            <main className="p-8 flex flex-1 flex-col gap-8 max-w-6xl mx-auto">
                <OwnerPageHeading></OwnerPageHeading>
                <OwnerAnalyticGrid></OwnerAnalyticGrid>
                <OwnerDashboardLayout></OwnerDashboardLayout>
            </main>
        </div>
    )
}

export default OwnerPage