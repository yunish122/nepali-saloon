import { createContext, useContext, useMemo, useState } from 'react';

const CustomerQueueContext = createContext(null);

export function CustomerQueueProvider({ children }) {
    const [appointments, setAppointments] = useState([]);

    function removeAppointment(id) {
        setAppointments((current) => current.filter((appointment) => appointment.id !== id));
    }

    function toggleAppointment(appointment) {
        setAppointments((current) => {
            const exists = current.some((item) => item.id === appointment.id);

            if (exists) {
                return current.filter((item) => item.id !== appointment.id);
            }

            return [...current, appointment];
        });
    }

    const value = useMemo(
        () => ({
            appointments,
            removeAppointment,
            toggleAppointment,
        }),
        [appointments],
    );

    return (
        <CustomerQueueContext.Provider value={value}>
            {children}
        </CustomerQueueContext.Provider>
    );
}

export function useCustomerQueue() {
    const context = useContext(CustomerQueueContext);

    if (!context) {
        throw new Error('useCustomerQueue must be used within CustomerQueueProvider');
    }

    return context;
}
