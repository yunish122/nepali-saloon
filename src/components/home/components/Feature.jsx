import Modal from "../../ui/Modal"
import { User, UserRound, UsersRound } from 'lucide-react';
import { Scissors } from 'lucide-react';
import { Luggage } from 'lucide-react';

function Feature() {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-black text-2xl font-semibold text-black/80">Tailored for Every Role</h1>
                <p className="text-black/70 font-medium text-sm">Features designed for customers, staff, and owners</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <Modal img={UserRound} userType="For Customer" featureTexts={["Real-time queue tracking",
                    "Find salons near you",
                    "View ratings & reviews"
                ]}></Modal>

                <Modal img={Scissors} userType="For Staff" featureTexts={["Track queue position",
                    "Manage service times",
                    "Customer management"
                ]}></Modal>


                <Modal img={Luggage} userType="For Owners" featureTexts={["Business analytics",
                    "Revenue tracking",
                    "Customer ratings"
                ]}></Modal>
            </div>
        </div>
    )
}

export default Feature