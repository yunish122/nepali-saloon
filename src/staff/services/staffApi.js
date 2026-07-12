import { apiClient, ensureCsrfCookie } from '../../lib/auth';

let csrfReady = null;

async function withCsrf(request) {
    if (!csrfReady) {
        csrfReady = ensureCsrfCookie().finally(() => {
            csrfReady = null;
        });
    }

    await csrfReady;
    return request();
}

export async function fetchStaffDashboard() {
    return withCsrf(() => apiClient.get('/api/staff/dashboard'));
}

export async function fetchActiveQueue() {
    return withCsrf(() => apiClient.get('/api/staff/queue/active'));
}

export async function fetchCompletedQueue() {
    return withCsrf(() => apiClient.get('/api/staff/queue/completed'));
}

export async function fetchStaffServices() {
    return withCsrf(() => apiClient.get('/api/staff/services'));
}

export async function fetchStaffData() {
    await ensureCsrfCookie();

    return Promise.all([
        apiClient.get('/api/staff/dashboard'),
        apiClient.get('/api/staff/queue/active'),
        apiClient.get('/api/staff/queue/completed'),
        apiClient.get('/api/staff/services'),
    ]);
}

export async function serveQueueEntry(entryId) {
    return withCsrf(() => apiClient.post(`/api/staff/queue-entry/${entryId}/serve`));
}

export async function skipQueueEntry(entryId) {
    return withCsrf(() => apiClient.post(`/api/staff/queue-entry/${entryId}/skip`));
}

export async function completeQueueEntry(entryId) {
    return withCsrf(() => apiClient.post(`/api/staff/queue-entry/${entryId}/complete`));
}

export async function updateSalonStatus(status) {
    return withCsrf(() => apiClient.patch('/api/staff/shop/status', { status }));
}

export async function updateServiceDurations(services) {
    return withCsrf(() => apiClient.patch('/api/staff/services/durations', { services }));
}
