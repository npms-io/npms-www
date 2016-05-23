export function markAsLoading(increment = 1) {
    return {
        type: 'App.MARK_AS_LOADING',
        payload: increment,
    };
}

export function unmarkAsLoading(decrement = 1) {
    return {
        type: 'App.UNMARK_AS_LOADING',
        payload: decrement,
    };
}

export function toggleMenu() {
    return {
        type: 'App.TOGGLE_MENU',
    };
}

export function closeMenu() {
    return {
        type: 'App.CLOSE_MENU',
    };
}
