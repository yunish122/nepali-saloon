import ServiceGrid from '../../../ui/ServiceGridIdk';

function ServiceGridLayout({ shopName, services, selectedServiceId, onJoinQueue }) {
    return (
        <section className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <div>
                <h2 className="text-lg font-semibold text-slate-800">Services at {shopName ?? 'this salon'}</h2>
                <p className="mt-1 text-sm text-slate-500">Each salon offers its own services. Choose one to join its queue.</p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {services.map((service) => (
                    <ServiceGrid
                        key={service.id}
                        cost={service.cost}
                        duration={service.duration}
                        serviceName={service.service_name}
                        selected={selectedServiceId === service.id}
                        onJoinQueue={() => onJoinQueue(service)}
                    />
                ))}
            </div>

            {services.length === 0 && <p className="mt-5 text-sm text-slate-500">No services are available for this salon yet.</p>}
        </section>
    );
}

export default ServiceGridLayout;
