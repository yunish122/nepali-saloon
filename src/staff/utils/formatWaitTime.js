export function formatWaitTime(minutes) {
    if (minutes === 0) {
        return '~0min';
    }

    return `~${minutes}min`;
}
