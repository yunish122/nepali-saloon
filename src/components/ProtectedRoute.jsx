import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthenticatedUser } from '../lib/auth';

function ProtectedRoute({ children }) {
    const location = useLocation();
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        let isMounted = true;

        getAuthenticatedUser()
            .then(() => {
                if (isMounted) {
                    setStatus('authenticated');
                }
            })
            .catch(() => {
                if (isMounted) {
                    setStatus('guest');
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

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

    return children;
}

export default ProtectedRoute;
