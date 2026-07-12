import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthenticatedUser } from '../lib/auth';

function userHasAllowedRole(user, allowedRoles) {
    const roleNames = (user?.roles ?? []).map((role) => role.name);

    return allowedRoles.some((role) => roleNames.includes(role));
}

function RoleProtectedRoute({ children, allowedRoles }) {
    const location = useLocation();
    const [status, setStatus] = useState('loading');
    const [redirectTo, setRedirectTo] = useState(null);

    useEffect(() => {
        let isMounted = true;

        getAuthenticatedUser()
            .then((user) => {
                if (!isMounted) {
                    return;
                }

                if (!userHasAllowedRole(user, allowedRoles)) {
                    const roleNames = (user?.roles ?? []).map((role) => role.name);

                    if (roleNames.includes('owner')) {
                        setRedirectTo('/owner/path');
                    } else if (roleNames.includes('customer')) {
                        setRedirectTo('/customer');
                    } else {
                        setRedirectTo('/login');
                    }

                    setStatus('forbidden');
                    return;
                }

                setStatus('authenticated');
            })
            .catch(() => {
                if (isMounted) {
                    setStatus('guest');
                }
            });

        return () => {
            isMounted = false;
        };
    }, [allowedRoles]);

    if (status === 'loading') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] text-sm text-slate-500">
                Loading...
            </div>
        );
    }

    if (status === 'guest') {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (status === 'forbidden') {
        return <Navigate to={redirectTo ?? '/login'} replace />;
    }

    return children;
}

export default RoleProtectedRoute;
