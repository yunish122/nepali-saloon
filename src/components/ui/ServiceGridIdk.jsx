import { Square } from "lucide-react"
function ServiceGridIdk({cost, duration, service_name, }) {
    return (
        <div className="bg-white w-full rounded-2xl px-4 py-1 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
            <div className="flex items-center gap-3">
                {/* Checkbox */}
                <Square className="w-5"></Square>
                {/* Service Info */}
                <div className="flex-1">
                    <h3 className="text-md font-semibold text-gray-900">{service_name}</h3>
                    <p className="text-gray-500 text-xs mt-1">
                        {cost}
                    </p>
                </div>

                {/* Priority Badge */}
                <div
                    className={'px-3 py-1 text-xs border-1 border-slate-300 font-semibold rounded-full capitalize'}
                >
                    High
                </div>
            </div>
        </div>

    )
}
export default ServiceGridIdk