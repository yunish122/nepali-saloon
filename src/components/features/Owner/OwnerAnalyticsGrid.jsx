import OwnerAnalyticCard from "../../ui/OwnerAnalyticCard"
import { DollarSign, Star,TrendingUp } from "lucide-react"
function OwnerAnalyticGrid(){
    return(
        <div className="grid gap-3 grid-cols-4 ">
            <OwnerAnalyticCard></OwnerAnalyticCard>
            <OwnerAnalyticCard title="Revenue" Icon={DollarSign} iconClassName="text-emerald-600"></OwnerAnalyticCard>
            <OwnerAnalyticCard title="Average Rating" Icon={Star} iconClassName="text-orange-700"></OwnerAnalyticCard>
            <OwnerAnalyticCard title="In Queue Now" Icon={TrendingUp} iconClassName="text-purple-700"></OwnerAnalyticCard>

        </div>
    )
}

export default OwnerAnalyticGrid