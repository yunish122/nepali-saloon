import { User } from 'lucide-react';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogOutModal from "../../LogOutModal";
import { getAuthenticatedUser, logout } from "../../../lib/auth";

function CustomerNavbar({ buttons = [] }) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [logoutError, setLogoutError] = useState("");

    useEffect(() => {
        async function loadAuthenticatedUser() {
            try {
                const user = await getAuthenticatedUser();
                setUserName(user.name);
            } catch (error) {
                console.error("Unable to load the authenticated user.", error);
            }
        }

        loadAuthenticatedUser();
    }, []);

    async function handleLogout() {
        setLogoutError("");
        setIsLoggingOut(true);

        try {
            await logout();
            setUserName("");
            setIsLogoutModalOpen(false);
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Unable to log out.", error);
            setLogoutError("Unable to log out. Please try again.");
        } finally {
            setIsLoggingOut(false);
        }
    }

    return (
        <header className=" px-6 flex justify-between border-b-1 border-gray-500/20  mx-auto px-4 md:px-8 lg:px-10 py-3">
            <div className="flex items-center gap-5">
                <span className="border-1 px-3 py-1 rounded-md shadow-md bg-black text-blue-200 font-semibold">S</span>
                <Link to="/customer" className="text-sm text-gray-600/90">Salons</Link>
                <Link to="/customer/my-queue" className="text-sm text-gray-600/90">Queues</Link>
            </div>
            <div className="flex relative gap-3 items-center">
                {isLogoutModalOpen && (
                    <LogOutModal
                        name={userName}
                        onLogout={handleLogout}
                        isLoggingOut={isLoggingOut}
                    />
                )}
                {logoutError && <span className="text-xs text-red-500">{logoutError}</span>}
                <span className="text-gray-600/90 text-sm">{userName}</span>
                <button
                    type="button"
                    onClick={() => setIsLogoutModalOpen((isOpen) => !isOpen)}
                    aria-label="Toggle account menu"
                    aria-expanded={isLogoutModalOpen}
                    className="hover:cursor-pointer"
                >
                    <User className="w-5 text-slate-500/70" />
                </button>
            </div>
        </header>

    )

}

export default CustomerNavbar;
