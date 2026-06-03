import ServiceHeading from "../../components/features/Owner/Service/ServiceHeading"
import Navbar from "../../components/Navbar"
import axios from "axios"
import { useEffect, useState } from "react"
import ServiceGrid from "../../components/features/Owner/Service/ServiceGrid"
import ServiceEditModal from "../../components/features/Owner/Service/ServiceEditModal"
import { ChevronsUp } from "lucide-react"
function ServicePage() {
    let [serviceData, setServiceData] = useState([])
    let [isOpen, setIsOpen] = useState(false)
    let [shop, setShop] = useState()
    let [isEditing, setIsEditing] = useState(false)
    let [selectedId, setSelectedServiceId] = useState(null)
    //this gets the data from the db and the data is used by the elements to render services
    useEffect(() => {
        axios.get('http://127.0.0.1:81/api/services')
            .then(res => {
                setServiceData(res.data)
            })

    }, [])

    //this gets the shop
    useEffect(() => {
        const res = axios.get('http://127.0.0.1:81/api/shops')
            .then(res => setShop(res.data))
    }, [])
    const shopId = shop?.[0]?.id
    //initilizes shop id
    useEffect(() => {
        if (shopId) {
            setFormData((prev) => ({
                ...prev,
                shop_id: shopId // This updates 'shop_id' to 8 on Render #3
            }));
        }
    }, [shopId]); // This means: "Run this block whenever shopId changes"

    //this initializes a formData 
    let [formData, setFormData] = useState({
        service_name: "",
        cost: 0,
        duration: 0,
        shop_id: shopId

    })

    let [editFormData, setEditFormData] = useState({
        service_name: "",
        cost: 0,
        duration: 0,
        shop_id: 0
    })

    let [mockEditData, setMockEditData] = useState(null) 

    // function haru start
    //update card state
    function updateCardState() {

        setFormData({
            service_name: "",
            cost: 0,
            duration: 0,
            shop_id: shopId

        })
        setIsOpen(!isOpen)

    }

    function updateWordPress(e) {
        let { name, type, value, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

    }


    // functions for service
    async function addService(e) {

        e.preventDefault();

        // console.log(formData);

        try {

            const res = await axios.post(
                "http://127.0.0.1:81/api/services",
                formData
            );

            setServiceData(prev => [...prev, res.data])
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
                .then(() => { setServiceData(prev => prev.filter(s => s.id !== id)) })
        } catch (err) {
            console.log(err.response?.data)
            console.log(err.response)
        }
    }

    function updateEditCardState(service){
        setEditFormData(service)
        setIsEditing(true)
    }

    function onClose(){
        setIsEditing(false)
    }

    async function saveEditedData(id){
        try{
            const res = await axios.put(`http://127.0.0.1:81/api/services/${id}`,editFormData)
            setServiceData(prev=>prev.map(serv => serv.id === id ? res.data : serv))
            onClose()
        }catch(err){
            console.log(err.response?.data)
            console.log(err.response)
        }
    }

    function onWordPressEdit(e){
        let {name, type, value, checked} = e.target

        setEditFormData(prev=>({
            ...prev, 
            [name]:value
        }))

    }
    return (
        <div>
            <Navbar></Navbar>
            <main className="p-8 flex flex-1 flex-col gap-8 max-w-6xl mx-auto">
                <ServiceHeading updateCardState={updateCardState} isOpen={isOpen} formData={formData} setFormData={setFormData} updateWordPress={updateWordPress} addService={addService}  ></ServiceHeading>
                <ServiceGrid setSelectedServiceId={setSelectedServiceId} services={serviceData} updateEditCardState={updateEditCardState} onDelete={(e) => { deleteService(e) }}></ServiceGrid>
                <ServiceEditModal  mockEditData={mockEditData} editFormData={editFormData} onClose={onClose} isEditing={isEditing} saveEditedData={saveEditedData} onWordPressEdit={onWordPressEdit}></ServiceEditModal>
            </main>
        </div>
    )
}

export default ServicePage