const defaultState = {
    loadingCount: 0,
};

function markAsLoading(state, action) {
    return {
        ...state,
        loadingCount: (state.loadingCount || 0) + action.payload,
    };
}

function unmarkAsLoading(state, action) {
    return {
        ...state,
        loadingCount: Math.max(0, state.loadingCount || 1) - action.payload,
    };
}

export function appReducer(state = defaultState, action) {
    switch (action.type) {
    case 'App.MARK_AS_LOADING':
        return markAsLoading(state, action);
    case 'App.UNMARK_AS_LOADING':
        return unmarkAsLoading(state, action);
    default:
        return state;
    }
}

export default appReducer;
