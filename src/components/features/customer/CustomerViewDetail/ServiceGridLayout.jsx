import ServiceGrid from "../../../ui/ServiceGridIdk"
function ServiceGridLayout({ services }) {
    return (

        <div className="border-1 w-full rounded-xl border-slate-200 shadow-sm px-6 py-4 flex flex-col gap-5">
            <div>
                <h2 className="font-semibold text-lg text-black/70">Services</h2>
                <p className="text-sm  text-black/60 ">Select services you want to book</p>
            </div>

            {/* grids */}
            <div className="grid grid-cols-2 gap-5">
                {
                    services.map((val) => (
                        <ServiceGrid key={val.id} cost={val.cost} duration={val.duration} service_name={val.service_name}></ServiceGrid>
                    ))
                }

            </div>
        </div>
    )
}
export default ServiceGridLayout