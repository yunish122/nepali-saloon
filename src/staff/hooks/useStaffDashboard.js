import { useCallback, useEffect, useState } from 'react';
import {
    fetchStaffData,
} from '../services/staffApi';
import { getApiErrorMessage } from '../../lib/apiErrors';

export function useStaffDashboard(activeTab) {
    const [dashboard, setDashboard] = useState(null);
    const [activeEntries, setActiveEntries] = useState([]);
    const [completedEntries, setCompletedEntries] = useState([]);
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const refreshAll = useCallback(async () => {
        setError('');

        try {
            const [
                dashboardResponse,
                activeResponse,
                completedResponse,
                servicesResponse,
            ] = await fetchStaffData();

            setDashboard(dashboardResponse.data);
            setActiveEntries(activeResponse.data.entries ?? []);
            setCompletedEntries(completedResponse.data.entries ?? []);
            setServices(servicesResponse.data.services ?? []);
        } catch (err) {
            setError(getApiErrorMessage(err, 'Unable to load staff dashboard.'));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshAll();
    }, [refreshAll]);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            if (activeTab !== 'settings') {
                refreshAll();
            }
        }, 15000);

        return () => window.clearInterval(intervalId);
    }, [activeTab, refreshAll]);

    return {
        dashboard,
        activeEntries,
        completedEntries,
        services,
        isLoading,
        error,
        refreshAll,
        setServices,
    };
}
