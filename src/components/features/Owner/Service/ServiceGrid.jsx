import ServiceCard from "../../../ui/ServiceCard"

function ServiceGrid({ services = [], onEdit, onDelete }) {
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
                        onEdit={onEdit}
                        onDelete={()=>{onDelete(val.id)}}
                    />
                ))
            }
        </div>
    )
}
export default ServiceGrid