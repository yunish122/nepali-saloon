function CustomerQueueList(){
    return (
        <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    
                    {/* 1. TABLE HEADER TRACK */}
                    <thead>
                        <tr className="bg-slate-200/70 border-b border-slate-200">
                            <th className="px-6 py-4 text-sm font-semibold text-slate-700 w-24">Position</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-700">Customer</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-700">Phone</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-700">Wait Time</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right pr-8">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                
                                {/* Position Badge Column */}
                                <td className="px-6 py-4">
                                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 bg-white shadow-sm">
                                        1
                                    </span>
                                </td>

                                {/* Customer Name Column */}
                                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                    Yunish
                                </td>

                                {/* Phone Column */}
                                <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                                    98872384723
                                </td>

                                {/* Wait Time Column */}
                                <td className="px-6 py-4 text-sm text-slate-800 font-semibold">
                                    45min
                                </td>

                                {/* Status Badge Column - Pushed cleanly to the right edge */}
                                <td className="px-6 py-4 text-right pr-8">
                                    <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 shadow-sm">
                                    status
                                    </span>
                                </td>

                            </tr>

                                                        <tr className="hover:bg-slate-50/50 transition-colors">
                                
                                {/* Position Badge Column */}
                                <td className="px-6 py-4">
                                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 bg-white shadow-sm">
                                        1
                                    </span>
                                </td>

                                {/* Customer Name Column */}
                                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                    Yunish
                                </td>

                                {/* Phone Column */}
                                <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                                    98872384723
                                </td>

                                {/* Wait Time Column */}
                                <td className="px-6 py-4 text-sm text-slate-800 font-semibold">
                                    45min
                                </td>

                                {/* Status Badge Column - Pushed cleanly to the right edge */}
                                <td className="px-6 py-4 text-right pr-8">
                                    <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 shadow-sm">
                                    status
                                    </span>
                                </td>

                            </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomerQueueList