import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:81';

export const authConfig = {
    withCredentials: true,
    withXSRFToken: true,
};

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    withXSRFToken: true,
});

export async function ensureCsrfCookie() {
    await axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`, authConfig);
}

export async function getAuthenticatedUser() {
    const response = await axios.get(`${API_BASE_URL}/user`, authConfig);

    return response.data.user;
}

export async function logout() {
    await ensureCsrfCookie();

    const response = await axios.post(`${API_BASE_URL}/logout`, {}, authConfig);

    try {
        await getAuthenticatedUser();
        throw new Error('Session still active after logout.');
    } catch (error) {
        if (error.message === 'Session still active after logout.') {
            throw error;
        }
    }

    return response.data;
}
