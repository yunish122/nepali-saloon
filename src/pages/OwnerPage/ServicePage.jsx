import ServiceHeading from "../../components/features/Owner/Service/ServiceHeading"
import ServiceCard from "../../components/ui/ServiceCard"
import Navbar from "../../components/Navbar"
import axios from "axios"
import { useEffect, useState } from "react"
import ServiceGrid from "../../components/features/Owner/Service/ServiceGrid"
function ServicePage() {
    let [serviceData, setServiceData] = useState([])
    let [isOpen, setIsOpen] = useState(false)
    let [shop, setShop] = useState()

    useEffect(() => {
        axios.get('http://127.0.0.1:81/api/services')
            .then(res => {
                setServiceData(res.data)
            })

    }, [])
    useEffect(() => {
        const res = axios.get('http://127.0.0.1:81/api/shops')
            .then(res => setShop(res.data))
    }, [])

    const shopId = shop?.[3]?.id


    let [formData, setFormData] = useState({
        service_name: "",
        cost: 0,
        duration: 0,
        shop_id: shopId

    })
    useEffect(() => {
        if (shopId) {
            setFormData((prev) => ({
                ...prev,
                shop_id: shopId // This updates 'shop_id' to 8 on Render #3
            }));
        }
    }, [shopId]); // This means: "Run this block whenever shopId changes"
    // console.log(formData)

    function updateCardState() {
        setIsOpen(!isOpen)

        setFormData({
            service_name: "",
            cost: 0,
            duration: 0,
            shop_id: shopId

        })
    }

    function updateWordPress(e) {
        let { name, type, value, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

    }

    async function addService(e) {

        e.preventDefault();

        // console.log(formData);

        try {

            const res = await axios.post(
                "http://127.0.0.1:81/api/services",
                formData
            );

            console.log(res.data);

            updateCardState();

        } catch (err) {

            console.log(err.response.data);

        }
        console.log('Done')
    }

    async function deleteService(id) {
        // e.preventDefault()
        console.log()
        try {
            const res = axios.delete(`http://127.0.0.1:81/api/services/${id}`,)
            .then(()=>{setServiceData(prev => prev.filter(s=>s.id !== id))})
        } catch (err) {
            console.log(err.response?.data)
            console.log(err.response)
        }
    }

    return (
        <div>
            <Navbar></Navbar>
            <main className="p-8 flex flex-1 flex-col gap-8 max-w-6xl mx-auto">
                <ServiceHeading updateCardState={updateCardState} isOpen={isOpen} formData={formData} setFormData={setFormData} updateWordPress={updateWordPress} addService={addService} ></ServiceHeading>
                <ServiceGrid services={serviceData} onDelete={(e)=>{deleteService(e)}}></ServiceGrid>
            </main>
        </div>
    )
}

export default ServicePage