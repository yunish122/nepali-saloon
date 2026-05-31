import CustomerFilter from "../../components/features/customer/CusotmerFIlter";
import CustomerHeading from "../../components/features/customer/CustomerHeading";
import CustomerNavbar from "../../components/features/customer/CustomerNavbar";
import CustomerSaloonGrid from "../../components/features/customer/CustomerSaloonGrid";


function CustomerPage() {
    return (
        <div>
            <CustomerNavbar></CustomerNavbar>
            <main className="flex flex-col gap-5 mx-30 my-10 ">
                <CustomerHeading></CustomerHeading>
                <CustomerFilter></CustomerFilter>
                <div className="grid grid-cols-3 grid-rows-5 gap-3">
                    <CustomerSaloonGrid shopName={'Yunish Saloon Shop'} location={'kathmandu'} phNumber={'9878787678'} ratings={2.4}
                        reviewCount={50} queueStatus={"Open"} totalQueue={5} duration={45}
                    ></CustomerSaloonGrid>

                </div>
            </main>
        </div>
    )
}

export default CustomerPage;