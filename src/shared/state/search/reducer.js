const defaultState = {
    uid: null,
    params: { q: '', from: 0, size: 25 },
    isLoading: false,
    results: null,
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

function updateParams(state, action) {
    return {
        ...state,
        params: {
            ...state.params,
            ...action.payload,
        },
    };
}

function run(state, action) {
    switch (action.type) {
    case 'Search.RUN_PENDING':
        return {
            ...state,
            uid: action.meta.uid,
            params: action.payload,
            isLoading: true,
        };
    case 'Search.RUN_REJECTED':
        if (state.uid !== action.meta.uid) {
            return state;
        }

        return {
            ...state,
            isLoading: false,
            results: null,
            error: action.error,
        };
    case 'Search.RUN_FULFILLED':
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
    case 'Search.SCROLL_PENDING':
        return {
            ...state,
            uid: action.meta.uid,
            params: action.payload,
            isLoading: true,
        };
    case 'Search.SCROLL_REJECTED':
        if (state.uid !== action.meta.uid) {
            return state;
        }

        return {
            ...state,
            isLoading: false,
            error: action.error,
        };
    case 'Search.SCROLL_FULFILLED':
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

export function searchReducer(state = defaultState, action) {
    switch (action.type) {
    case 'Search.UPDATE_PARAMS':
        return updateParams(state, action);
    case 'Search.RESET':
        return reset(state, action);
    case 'Search.RUN_PENDING':
    case 'Search.RUN_FULFILLED':
    case 'Search.RUN_REJECTED':
        return run(state, action);
    case 'Search.SCROLL_PENDING':
    case 'Search.SCROLL_FULFILLED':
    case 'Search.SCROLL_REJECTED':
        return scroll(state, action);
    default:
        return state;
    }
}

export default searchReducer;
