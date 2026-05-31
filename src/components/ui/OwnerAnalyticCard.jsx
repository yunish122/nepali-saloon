import { Users } from 'lucide-react';

function OwnerAnalyticCard({
    title = 'TOTAL CUSTOMERS TODAY',
    value = 5,
    delta = '+12%',
    Icon = Users,
    iconClassName = ''
}) {
    return (
        <div className="group w-full max-w-[18rem] rounded-lg border border-slate-200 bg-white px-6 py-4 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-violet-300 ">
            <div className="flex items-center justify-between gap-3">
                <div className='flex flex-col gap-3'>
                    <p className="text-xs font-semibold tracking-wide text-slate-500">{title}</p>
                    <div className=" flex items-center gap-3">
                        <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
                        <span className="text-xs text-emerald-600 font-medium">{delta}</span>
                    </div>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-300/40 transition-colors duration-200 group-hover:bg-violet-50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md  ">
                        <Icon className={iconClassName} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OwnerAnalyticCard;