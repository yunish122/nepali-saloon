import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OwnerSettingsUI from '../../components/features/Owner/OwnerSettingsUI';
import { API_BASE_URL, ensureCsrfCookie, getAuthenticatedUser } from '../../lib/auth';
import { getApiErrorMessage } from '../../lib/apiErrors';

const defaultServices = [
    { id: 1, service_name: 'Hair Cut', cost: 500, duration: 30 },
    { id: 2, service_name: 'Hair Color', cost: 1500, duration: 90 },
    { id: 3, service_name: 'Facial', cost: 800, duration: 60 },
    { id: 4, service_name: 'Massage', cost: 1000, duration: 60 },
];

function formatTimeForDisplay(time) {
    if (!time) {
        return '';
    }

    if (time.includes('AM') || time.includes('PM')) {
        return time;
    }

    const timePart = time.includes('T') ? time.split('T')[1]?.slice(0, 8) : time;
    const segments = timePart.split(':');

    if (segments.length < 2) {
        return time;
    }

    const hour = Number(segments[0]);
    const minutes = segments[1];

    if (Number.isNaN(hour)) {
        return time;
    }

    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;

    return `${String(displayHour).padStart(2, '0')}:${minutes} ${suffix}`;
}

function parseTimeForApi(time) {
    if (!time) {
        return null;
    }

    const trimmed = time.trim();

    if (/^\d{2}:\d{2}:\d{2}$/.test(trimmed)) {
        return trimmed;
    }

    if (/^\d{2}:\d{2}$/.test(trimmed)) {
        return `${trimmed}:00`;
    }

    const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

    if (!match) {
        return null;
    }

    let hour = Number(match[1]);
    const minutes = match[2];
    const period = match[3].toUpperCase();

    if (period === 'PM' && hour !== 12) {
        hour += 12;
    }

    if (period === 'AM' && hour === 12) {
        hour = 0;
    }

    return `${String(hour).padStart(2, '0')}:${minutes}:00`;
}

function mapShopToValues(shop) {
    return {
        shop_name: shop.shop_name ?? '',
        phone: shop.phone ?? '',
        location: shop.location ?? '',
        description: shop.description ?? 'Professional salon providing premium beauty services',
        opening_time: formatTimeForDisplay(shop.opening_time) || '09:00 AM',
        closing_time: formatTimeForDisplay(shop.closing_time) || '07:00 PM',
    };
}

export default function ShopSettings() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [shopId, setShopId] = useState(null);
    const [hasShop, setHasShop] = useState(true);
    const [values, setValues] = useState({
        shop_name: '',
        phone: '',
        location: '',
        description: '',
        opening_time: '09:00 AM',
        closing_time: '07:00 PM',
    });
    const [salonStatus, setSalonStatus] = useState(true);
    const [services, setServices] = useState(defaultServices);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState('');
    const [saveMessage, setSaveMessage] = useState('');

    useEffect(() => {
        async function loadPageData() {
            let user = null;

            try {
                user = await getAuthenticatedUser();
                setUserName(user.name);
            } catch {
                setHasShop(false);
                return;
            }

            try {
                await ensureCsrfCookie();

                const shopResponse = await axios.get(`${API_BASE_URL}/api/my-shop`, {
                    withCredentials: true,
                    withXSRFToken: true,
                });

                const shop = shopResponse.data;
                setShopId(shop.id);
                setHasShop(true);
                setValues(mapShopToValues(shop));
                setSalonStatus(shop.status === 1);

                const servicesResponse = await axios.get(`${API_BASE_URL}/api/services`, {
                    withCredentials: true,
                    withXSRFToken: true,
                });

                const shopServices = Array.isArray(servicesResponse.data)
                    ? servicesResponse.data.filter((service) => service.shop_id === shop.id)
                    : [];

                if (shopServices.length > 0) {
                    setServices(shopServices);
                } else {
                    setServices([]);
                }
            } catch (error) {
                if (error.response?.status === 401) {
                    navigate('/login', { replace: true });
                    return;
                }

                if (error.response?.status === 404) {
                    setHasShop(false);
                    setShopId(null);
                    return;
                }

                setSaveError(getApiErrorMessage(error, 'Unable to load salon settings.'));
            }
        }

        loadPageData();
    }, []);

    function handleChange(name, value) {
        setValues((current) => ({ ...current, [name]: value }));
        setSaveError('');
        setSaveMessage('');
    }

    async function handleSave() {
        if (!shopId) {
            setSaveError(`No shop is affiliated with user ${userName}.`);
            return;
        }

        setIsSaving(true);
        setSaveError('');
        setSaveMessage('');

        try {
            await ensureCsrfCookie();

            const openingTime = parseTimeForApi(values.opening_time);
            const closingTime = parseTimeForApi(values.closing_time);

            if (!openingTime || !closingTime) {
                setSaveError('Please enter valid opening and closing times (e.g. 09:00 AM).');
                setIsSaving(false);
                return;
            }

            const payload = {
                shop_name: values.shop_name,
                phone: values.phone,
                location: values.location,
                opening_time: openingTime,
                closing_time: closingTime,
                status: salonStatus ? 1 : 2,
            };

            const response = await axios.patch(
                `${API_BASE_URL}/api/shops/${shopId}`,
                payload,
                { withCredentials: true, withXSRFToken: true },
            );

            const updatedShop = response.data;
            setValues(mapShopToValues(updatedShop));
            setSalonStatus(Number(updatedShop.status) === 1);
            setSaveMessage('Settings saved successfully.');
        } catch (error) {
            setSaveError(getApiErrorMessage(error, 'Unable to save salon settings.'));
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <OwnerSettingsUI
            userName={userName}
            hasShop={hasShop}
            emptyMessage={`No shop is affiliated with user ${userName}.`}
            values={values}
            salonStatus={salonStatus}
            services={services}
            isSaving={isSaving}
            saveError={saveError}
            saveMessage={saveMessage}
            onChange={handleChange}
            onToggleOpen={setSalonStatus}
            onEditService={() => navigate('/owner/services')}
            onAddService={() => navigate('/owner/services')}
            onCancel={() => navigate('/owner/path')}
            onSave={handleSave}
        />
    );
}
