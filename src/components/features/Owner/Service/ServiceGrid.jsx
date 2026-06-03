import ServiceCard from "../../../ui/ServiceCard"

function ServiceGrid({ services = [], onDelete, updateEditCardState, updateData, setServiceData, }) {
    const serviceList = Array.isArray(services) ? services : []
    return (
        <div className="grid grid-cols-2 gap-5">
            {
                serviceList.map((val) => (
                    <ServiceCard
                        key={val.id}
                        title={val.service_name}
                        price={val.cost}
                        duration={val.duration}
                        priority={"High"}
                        demandText={"Adjust based on bookings"}
                        onDelete={() => { onDelete && onDelete(val.id) }}
                        updateData={()=>{updateData(val)}}
                        updateEditCardState={()=>{updateEditCardState(val)}}
                    />
                ))
            }
        </div>
    )
}
export default ServiceGrid