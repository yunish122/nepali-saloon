import OwnerSettingsUI from "../../components/features/Owner/OwnerSettingsUI"
import Navbar from "../../components/Navbar"

function OwnerSettingsPage(){
    return(
        <div className="w-screen flex flex-col gap-5 flex-1 ">
            <Navbar></Navbar>
            <main className=" flex mx-auto">
                <OwnerSettingsUI></OwnerSettingsUI>
            </main>
        </div>
    )
}

export default OwnerSettingsPage