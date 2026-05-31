import { Luggage } from 'lucide-react';

function Modal({ img: Icon, userType, featureTexts }) {
    return (
        <div className="border-1 border-black/10 shoadow-lg rounded-lg p-3 flex flex-col gap-2">
            <Icon className="text-gray-500 w-5 h-5"></Icon>
            <h2 className="font-semibold text-black/80 text-lg">For Customers</h2>
            <p className="text-sm">{userType}</p>
            <ul className="text-gray-500 space-y-1 font-medium">
                {
                    featureTexts.map((val, idx) =>
                        <li key={idx} className="text-xs text-gray-500/80">{val}</li>
                    )
                }
            </ul>
        </div>
    )
}

export default Modal