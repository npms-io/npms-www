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
