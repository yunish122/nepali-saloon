import Button from "../../ui/Button";
import { User } from 'lucide-react';

import { Link } from "react-router-dom";
import LogOutModal from "../../LogOutModal";

function CustomerNavbar({ buttons = [] }) {

    return (
        <header className=" px-6 flex justify-between border-b-1 border-gray-500/20  mx-auto px-4 md:px-8 lg:px-10 py-3">
            <div className="flex items-center gap-5">
                <span className="border-1 px-3 py-1 rounded-md shadow-md bg-black text-blue-200 font-semibold">S</span>
                <Link to={'/customer'} className="text-sm text-gray-600/90" href="">Salons</Link>
                <Link to={'/customer/my-queue'} className="text-sm text-gray-600/90" href="">Queues</Link>
            </div>
            <div className="flex relative gap-3 items-center">
                <LogOutModal></LogOutModal>
                <a className="text-gray-600/90 text-sm" href="">Priya Sharma</a>
                <User className="hover:cursor-pointer w-5 text-slate-500/70"></User>
            </div>
        </header>
        
    )

}

export default CustomerNavbar;