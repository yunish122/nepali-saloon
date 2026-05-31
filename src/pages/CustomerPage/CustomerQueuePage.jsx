import CustomerQueueGrid from "../../components/features/customer/CustomerQueue/CustomerQueueGrid"
import CustomerQueueHeading from "../../components/features/customer/CustomerQueue/CustomerQueueHeading"
import CustomerNavbar from "../../components/features/customer/CustomerNavbar"
function CustomerQueuePage() {
    return (
        <div>
            <CustomerNavbar></CustomerNavbar>
            <main className="max-w-4xl mx-auto py-10 flex flex-col gap-10 ">
                <CustomerQueueHeading></CustomerQueueHeading>
                <CustomerQueueGrid></CustomerQueueGrid>
            </main>

        </div>
        // <CustomerQueueGrid></CustomerQueueGrid>
    )
}
export default CustomerQueuePage