export function reset() {
    return {
        type: 'Search.Settings.RESET',
    };
}

export function update(settings) {
    return {
        type: 'Search.Settings.UPDATE',
        payload: settings,
    };
}
