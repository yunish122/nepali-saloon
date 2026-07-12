import { useState } from 'react';
import { completeQueueEntry, serveQueueEntry, skipQueueEntry, updateSalonStatus, updateServiceDurations } from '../services/staffApi';
import { getApiErrorMessage } from '../../lib/apiErrors';

export function useStaffQueueActions({ onSuccess }) {
    const [actionError, setActionError] = useState('');
    const [isSavingSettings, setIsSavingSettings] = useState(false);
    const [settingsMessage, setSettingsMessage] = useState('');

    async function handleServe(entryId) {
        setActionError('');

        try {
            await serveQueueEntry(entryId);
            await onSuccess?.();
        } catch (error) {
            setActionError(getApiErrorMessage(error, 'Unable to serve this customer.'));
        }
    }

    async function handleSkip(entryId) {
        setActionError('');

        try {
            await skipQueueEntry(entryId);
            await onSuccess?.();
        } catch (error) {
            setActionError(getApiErrorMessage(error, 'Unable to skip this customer.'));
        }
    }

    async function handleComplete(entryId) {
        setActionError('');

        try {
            await completeQueueEntry(entryId);
            await onSuccess?.();
        } catch (error) {
            setActionError(getApiErrorMessage(error, 'Unable to finish serving this customer.'));
        }
    }

    async function handleToggleSalonStatus(isOpen) {
        setActionError('');

        try {
            await updateSalonStatus(isOpen ? 1 : 2);
            await onSuccess?.();
        } catch (error) {
            setActionError(getApiErrorMessage(error, 'Unable to update salon status.'));
        }
    }

    async function handleSaveDurations(services) {
        setIsSavingSettings(true);
        setActionError('');
        setSettingsMessage('');

        try {
            await updateServiceDurations(
                services.map((service) => ({
                    id: service.id,
                    duration: Number(service.duration),
                })),
            );
            setSettingsMessage('Settings saved successfully.');
            await onSuccess?.();
        } catch (error) {
            setActionError(getApiErrorMessage(error, 'Unable to save service settings.'));
        } finally {
            setIsSavingSettings(false);
        }
    }

    return {
        actionError,
        isSavingSettings,
        settingsMessage,
        handleServe,
        handleSkip,
        handleComplete,
        handleToggleSalonStatus,
        handleSaveDurations,
        setActionError,
    };
}
