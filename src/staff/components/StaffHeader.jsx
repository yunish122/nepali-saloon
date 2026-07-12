import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogOutModal from '../../components/LogOutModal';
import { getAuthenticatedUser, logout } from '../../lib/auth';

function StaffHeader({ shopName }) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [logoutError, setLogoutError] = useState('');

    useEffect(() => {
        async function loadUser() {
            try {
                const user = await getAuthenticatedUser();
                setUserName(user.name);
            } catch {
                setUserName('');
            }
        }

        loadUser();
    }, []);

    async function handleLogout() {
        setLogoutError('');
        setIsLoggingOut(true);

        try {
            await logout();
            navigate('/login', { replace: true });
        } catch {
            setLogoutError('Unable to log out. Please try again.');
        } finally {
            setIsLoggingOut(false);
        }
    }

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#121b31] text-lg font-semibold text-white">
                        S
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-800">SalonHub Staff</p>
                        {shopName && <p className="text-xs text-slate-500">{shopName}</p>}
                    </div>
                </div>

                <div className="relative flex items-center gap-3">
                    {isLogoutModalOpen && (
                        <LogOutModal
                            name={userName}
                            onLogout={handleLogout}
                            isLoggingOut={isLoggingOut}
                        />
                    )}
                    {logoutError && <span className="text-xs text-red-500">{logoutError}</span>}
                    <span className="text-sm text-slate-600">{userName}</span>
                    <button
                        type="button"
                        onClick={() => setIsLogoutModalOpen((open) => !open)}
                        aria-label="Toggle account menu"
                        className="rounded-full p-1 hover:bg-slate-100"
                    >
                        <User className="h-5 w-5 text-slate-500" />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default StaffHeader;
