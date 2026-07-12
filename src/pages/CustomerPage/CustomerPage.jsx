import axios from "axios";
import { useEffect, useState } from "react";
import CustomerFilter from "../../components/features/customer/CusotmerFIlter";
import CustomerHeading from "../../components/features/customer/CustomerHeading";
import CustomerNavbar from "../../components/features/customer/CustomerNavbar";
import CustomerSaloonGrid from "../../components/features/customer/CustomerSaloonGrid";


function CustomerPage() {
    const [shops, setShops] = useState([]);
    const [services, setServices] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [locationValue, setLocationValue] = useState("all");

    useEffect(() => {
        async function loadData() {
            try {
                const [shopsResponse, servicesResponse] = await Promise.all([
                    axios.get("http://localhost:81/api/shops"),
                    axios.get("http://localhost:81/api/services"),
                ]);
                setShops(shopsResponse.data);
                setServices(servicesResponse.data);
            } catch (error) {
                console.error("Unable to load salons.", error);
            }
        }

        loadData();
    }, []);

    const servicesByShopId = services.reduce((grouped, service) => {
        if (!grouped[service.shop_id]) {
            grouped[service.shop_id] = [];
        }

        grouped[service.shop_id].push(service);
        return grouped;
    }, {});

    const matchingShops = shops.filter((shop) => {
        const matchesSearch = shop.shop_name.toLowerCase().includes(searchValue.trim().toLowerCase());
        const matchesLocation = locationValue === "all" || shop.location.toLowerCase().includes(locationValue);

        return matchesSearch && matchesLocation;
    });

    return (
        <div>
            <CustomerNavbar></CustomerNavbar>
            <main className="flex flex-col gap-10 mx-30 my-10 ">
                <CustomerHeading></CustomerHeading>
                <CustomerFilter
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    locationValue={locationValue}
                    onLocationChange={setLocationValue}
                />
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {matchingShops.map((shop) => (
                        <CustomerSaloonGrid
                            key={shop.id}
                            shopId={shop.id}
                            shopName={shop.shop_name}
                            location={shop.location}
                            phNumber={shop.phone}
                            openingTime={shop.opening_time}
                            closingTime={shop.closing_time}
                            queueStatus={shop.status === 1 ? "Open" : "Closed"}
                            services={servicesByShopId[shop.id] ?? []}
                        />
                    ))}
                </div>
                {matchingShops.length === 0 && (
                    <p className="text-sm text-slate-500">No salons match “{searchValue}”.</p>
                )}
            </main>
        </div>
    )
}

export default CustomerPage;
