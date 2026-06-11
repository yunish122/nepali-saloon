import { useEffect, useState } from "react"
import OwnerSettingsUI from "../../components/features/Owner/OwnerSettingsUI"
import Navbar from "../../components/Navbar"
import axios from "axios"

function OwnerSettingsPage(){
    
    let [services, setServiceData] = useState([])
    
    useEffect(() => {
        axios.get('http://127.0.0.1:81/api/services')
            .then(res => {
                setServiceData(res.data)
            })

    }, [])

    function onAddService(){

    }


    function onCancel(){

    }

    function onSave(){

    }

    let [salonStatus, setSaloonStatus] = useState(true)
    function onToggleOpen(){
        setSaloonStatus(!salonStatus)
    }

    let [isEditing, setIsEditing] = useState(false)

    function toggleIsEditing(){
        setIsEditing(!isEditing)
    }
    return(
        <div className="w-screen flex flex-col gap-5 flex-1 ">
            <Navbar></Navbar>
            <main className=" flex mx-auto">
                <OwnerSettingsUI toggleIsEditing={toggleIsEditing} isEditing={isEditing} onToggleOpen={onToggleOpen} salonStatus={salonStatus} services={services} onAddService={onAddService} onCancel={onCancel} onSave={onSave}></OwnerSettingsUI>
            </main>
        </div>
    )
}

export default OwnerSettingsPage