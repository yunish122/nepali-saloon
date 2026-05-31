import { MapPin, Clock, Phone, Star, Users } from 'lucide-react';
import ServiceGrid from '../../components/ui/ServiceGridIdk';
import ShopServiceDetail from '../../components/features/customer/CustomerViewDetail/ShopServiceDetail';
import ServiceGridLayout from '../../components/features/customer/CustomerViewDetail/ServiceGridLayout';
import CustomerQueueList from '../../components/features/customer/CustomerViewDetail/CustomerQueueList';
import Button from '../../components/ui/Button';
import CustomerNavbar from '../../components/features/customer/CustomerNavbar';
import { useEffect, useState } from 'react';
import axios from "axios";

function CustomerViewDetailPage() {
    let [shopData, setShopData] = useState([])
    let [serviceData, setService] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:81/api/shops')
            .then(res => setShopData(res.data))

    }, [])

    useEffect(() => {
        axios.get('http://127.0.0.1:81/api/services')
            .then(res => setService(res.data))

    }, [])

    const totalDuration = serviceData.reduce((acc, val) => acc + Number(val.duration), 0);
    let avgDuration = totalDuration / serviceData.length
    const formatted = avgDuration.toFixed(1)
    return (
        <div>
            <CustomerNavbar></CustomerNavbar>
            <main className="px-4 py-6 flex flex-col gap-6 max-w-4xl mx-auto">
                <Button className='text-left font-medium text-slate-500 w-fit rounded-md hover:text-white hover:bg-[#8b5cf6] hover:cursor-pointer inline-flex  duration-100 trasition-all' size='md' title={"Back to Salons"}></Button>
                <ShopServiceDetail shop_name={shopData[0]?.shop_name} location={shopData[0]?.location} closing_time={shopData[0]?.closing_time}
                    opening_time={shopData[0]?.opening_time} phone={shopData[0]?.phone} shopStatus={shopData[0]?.status}
                    avg_duration={formatted}
                ></ShopServiceDetail>
                <ServiceGridLayout services={serviceData}></ServiceGridLayout>
                <CustomerQueueList></CustomerQueueList>
            </main>
        </div>

    )
}

export default CustomerViewDetailPage