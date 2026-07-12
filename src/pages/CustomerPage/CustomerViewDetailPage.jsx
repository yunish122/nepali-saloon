import { Info } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import ShopServiceDetail from '../../components/features/customer/CustomerViewDetail/ShopServiceDetail';
import ServiceGridLayout from '../../components/features/customer/CustomerViewDetail/ServiceGridLayout';
import CustomerQueueList from '../../components/features/customer/CustomerViewDetail/CustomerQueueList';
import Button from '../../components/ui/Button';
import CustomerNavbar from '../../components/features/customer/CustomerNavbar';
import { useCustomerQueue } from '../../context/CustomerQueueContext';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const queueSizes = [3, 7, 11, 5, 9, 4];
const customerNames = ['Aarav K.', 'Saanvi R.', 'Rohan P.', 'Anisha T.', 'Bikash M.', 'Nisha S.', 'Kabir G.', 'Priya D.', 'Suman B.', 'Aditi K.', 'Ritesh P.'];
const MAX_QUEUE_WAIT_MINUTES = 60;

function CustomerViewDetailPage() {
    const [shopData, setShopData] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [queueDialog, setQueueDialog] = useState(null);
    const [searchParams] = useSearchParams();
    const { appointments, toggleAppointment } = useCustomerQueue();
    const shopId = Number(searchParams.get('shop'));

    useEffect(() => {
        axios.get('http://localhost:81/api/shops').then((res) => setShopData(res.data));
        axios.get('http://localhost:81/api/services').then((res) => setServiceData(res.data));
    }, []);

    const shop = shopData.find((item) => item.id === shopId) ?? shopData[0];
    const services = useMemo(
        () => serviceData.filter((service) => service.shop_id === shop?.id),
        [serviceData, shop?.id]
    );
    const averageServiceDuration = services.length
        ? Math.round(services.reduce((total, service) => total + Number(service.duration), 0) / services.length)
        : 30;
    const queueSize = queueSizes[(Math.max(shop?.id ?? 1, 1) - 1) % queueSizes.length];
    const estimatedWaitMinutes = Math.min(queueSize * averageServiceDuration, MAX_QUEUE_WAIT_MINUTES);
    const queueEntries = Array.from({ length: queueSize }, (_, index) => ({
        id: index + 1,
        customer: customerNames[(index + (shop?.id ?? 0)) % customerNames.length],
        waitMinutes: Math.min(index * averageServiceDuration, MAX_QUEUE_WAIT_MINUTES),
        status: index === 0 ? 'In progress' : 'Waiting',
    }));
    const selectedAppointment = appointments.find((appointment) => appointment.shopId === shop?.id);
    const selectedService = services.find((service) => service.id === selectedAppointment?.serviceId);

    function createAppointment(service) {
        if (!shop) {
            return null;
        }

        return {
            id: `${shop.id}-${service.id}`,
            shopId: shop.id,
            shopName: shop.shop_name,
            location: shop.location,
            phone: shop.phone,
            openingTime: shop.opening_time,
            closingTime: shop.closing_time,
            serviceId: service.id,
            serviceName: service.service_name,
            cost: service.cost,
            queuePosition: queueSize + 1,
            estimatedWaitMinutes,
        };
    }

    function requestQueueJoin(service) {
        if (selectedAppointment?.serviceId === service.id) {
            setQueueDialog({ type: 'already-joined', service });
            return;
        }

        if (appointments.length > 0) {
            setQueueDialog({ type: 'existing-queue', service });
            return;
        }

        setQueueDialog({ type: 'confirm', service });
    }

    function confirmQueueJoin(service) {
        const appointment = createAppointment(service);

        if (!appointment) {
            return;
        }

        toggleAppointment(appointment);
        setQueueDialog(null);
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <CustomerNavbar />
            <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 md:px-6">
                <Link to="/customer" className="w-fit">
                    <Button className="rounded-md text-left font-medium text-slate-500 transition hover:bg-slate-800 hover:text-white" size="md" title="Back to Salons" />
                </Link>

                <ShopServiceDetail
                    shopId={shop?.id}
                    shopName={shop?.shop_name}
                    location={shop?.location}
                    closingTime={shop?.closing_time}
                    openingTime={shop?.opening_time}
                    phone={shop?.phone}
                    shopStatus={shop?.status}
                    queueCount={queueSize}
                    estimatedWaitMinutes={estimatedWaitMinutes}
                    rating={(4.2 + ((shop?.id ?? 1) % 5) / 10).toFixed(1)}
                    services={services}
                />

                <ServiceGridLayout
                    shopName={shop?.shop_name}
                    services={services}
                    selectedServiceId={selectedService?.id}
                    onJoinQueue={requestQueueJoin}
                />

                {selectedService && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                        You joined the queue for <span className="font-semibold">{selectedService.service_name}</span>. View it in My Queue.
                    </div>
                )}

                <CustomerQueueList queueEntries={queueEntries} estimatedWaitMinutes={estimatedWaitMinutes} />

                <section className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                    <div>
                        <h2 className="font-semibold text-slate-800">Booking information</h2>
                        <ul className="mt-2 space-y-1 text-sm text-slate-500">
                            <li>Queue positions are first-come, first-served.</li>
                            <li>Waiting time is an estimate and can change as services finish.</li>
                            <li>You can join the queue for one service at a time.</li>
                        </ul>
                    </div>
                </section>
            </main>

            {queueDialog && (
                <QueueConfirmationDialog
                    dialog={queueDialog}
                    queuePosition={queueSize + 1}
                    estimatedWaitMinutes={estimatedWaitMinutes}
                    onConfirm={confirmQueueJoin}
                    onClose={() => setQueueDialog(null)}
                />
            )}
        </div>
    );
}

function QueueConfirmationDialog({ dialog, queuePosition, estimatedWaitMinutes, onConfirm, onClose }) {
    const isConfirmation = dialog.type === 'confirm';
    const message = dialog.type === 'existing-queue'
        ? 'You already have an active queue appointment. Remove it from My Queue before joining another salon queue.'
        : dialog.type === 'already-joined'
            ? 'You have already joined this service queue. You can manage or leave it from My Queue.'
            : `You are about to join the queue for ${dialog.service.service_name}.`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4" onClick={onClose}>
            <section role="dialog" aria-modal="true" aria-labelledby="queue-confirmation-title" className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">Queue booking</p>
                <h2 id="queue-confirmation-title" className="mt-2 text-xl font-semibold text-slate-800">{isConfirmation ? 'Confirm queue entry' : 'One active queue at a time'}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{message}</p>

                {isConfirmation && (
                    <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 text-center">
                        <div><p className="text-lg font-semibold text-slate-800">#{queuePosition}</p><p className="text-xs text-slate-500">Your queue position</p></div>
                        <div><p className="text-lg font-semibold text-slate-800">~{estimatedWaitMinutes} min</p><p className="text-xs text-slate-500">Estimated wait</p></div>
                    </div>
                )}

                <div className="mt-6 flex justify-end gap-3">
                    <Button title={isConfirmation ? 'Cancel' : 'Close'} onClick={onClose} className="rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" />
                    {isConfirmation && (
                        <Button
                            title="Confirm Join Queue"
                            onClick={(event) => {
                                event.stopPropagation();
                                onConfirm(dialog.service);
                            }}
                            className="rounded-lg bg-slate-800 text-white hover:bg-slate-700"
                        />
                    )}
                </div>
            </section>
        </div>
    );
}

export default CustomerViewDetailPage;
