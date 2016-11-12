const defaultState = {
    uid: null,
    params: { q: '', from: 0, size: 25 },
    isLoading: false,
    results: null,
    error: null,
};

function reset(state) {
    return {
        ...defaultState,
        params: {
            ...state.params,
            q: '',
            from: 0,
        },
    };
}

function updateQuery(state, action) {
    return {
        ...state,
        params: {
            ...state.params,
            q: action.payload,
        },
    };
}

function run(state, action) {
    switch (action.type) {
    case 'Search.Main.RUN_PENDING':
        return {
            ...state,
            uid: action.meta.uid,
            params: action.payload,
            isLoading: true,
        };
    case 'Search.Main.RUN_REJECTED':
        if (state.uid !== action.meta.uid) {
            return state;
        }

        return {
            ...state,
            isLoading: false,
            results: null,
            error: action.payload,
        };
    case 'Search.Main.RUN_FULFILLED':
        if (state.uid !== action.meta.uid) {
            return state;
        }

        return {
            ...state,
            isLoading: false,
            results: {
                q: state.params.q,
                ...action.payload,
            },
            error: null,
        };
    default:
        throw new Error('Unknown action type');
    }
}

function scroll(state, action) {
    switch (action.type) {
    case 'Search.Main.SCROLL_PENDING':
        return {
            ...state,
            uid: action.meta.uid,
            params: action.payload,
            isLoading: true,
        };
    case 'Search.Main.SCROLL_REJECTED':
        if (state.uid !== action.meta.uid) {
            return state;
        }

        return {
            ...state,
            isLoading: false,
            error: action.payload,
        };
    case 'Search.Main.SCROLL_FULFILLED':
        if (state.uid !== action.meta.uid) {
            return state;
        }

        return {
            ...state,
            isLoading: false,
            results: {
                q: state.params.q,
                ...action.payload,
                items: state.results.items.concat(action.payload.items),
            },
            error: null,
        };
    default:
        throw new Error('Unknown action type');
    }
}

// --------------------------------------------------

export function mainReducer(state = defaultState, action) {
    switch (action.type) {
    case 'Search.Main.UPDATE_QUERY':
        return updateQuery(state, action);
    case 'Search.Main.RESET':
        return reset(state, action);
    case 'Search.Main.RUN_PENDING':
    case 'Search.Main.RUN_FULFILLED':
    case 'Search.Main.RUN_REJECTED':
        return run(state, action);
    case 'Search.Main.SCROLL_PENDING':
    case 'Search.Main.SCROLL_FULFILLED':
    case 'Search.Main.SCROLL_REJECTED':
        return scroll(state, action);
    default:
        return state;
    }
}

export default mainReducer;
