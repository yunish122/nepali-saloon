
import { Settings } from "lucide-react"
import { Link } from "react-router-dom"
function OwnerPageHeading(){

    return(
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-black/80">Elegance Salon </h1>
                <p className="font-medium text-gray-500">Premium Business Dashboard & Analytics</p>
            </div>

            <div className="flex gap-2 items-center border-1 w-fit px-2 py-1 rounded-lg hover:cursor-pointer bg-black">
                <Settings className="text-white w-4"></Settings>
                <Link to={'/owner/services'} className="text-white text-sm font-medium">Manage Saloon</Link>
            </div>

        </div>
    )
}
export default OwnerPageHeading