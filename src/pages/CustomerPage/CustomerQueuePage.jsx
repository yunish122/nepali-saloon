import CustomerQueueGrid from '../../components/features/customer/CustomerQueue/CustomerQueueGrid';
import CustomerQueueHeading from '../../components/features/customer/CustomerQueue/CustomerQueueHeading';
import CustomerNavbar from '../../components/features/customer/CustomerNavbar';
import { useCustomerQueue } from '../../context/CustomerQueueContext';

function CustomerQueuePage() {
    const { appointments, removeAppointment } = useCustomerQueue();

    return (
        <div className="min-h-screen bg-slate-50">
            <CustomerNavbar />
            <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-10 md:px-6">
                <CustomerQueueHeading />
                <CustomerQueueGrid appointments={appointments} onRemoveAppointment={removeAppointment} />
            </main>
        </div>
    );
}

export default CustomerQueuePage;
