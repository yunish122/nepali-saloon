export function getApiErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
    const data = error?.response?.data;

    if (!data) {
        return fallback;
    }

    if (data.errors) {
        return Object.values(data.errors).flat().join(' ');
    }

    if (data.message) {
        return data.message;
    }

    if (data.error) {
        return data.error;
    }

    return fallback;
}
