const defaultState = {
    uid: null,
    query: { term: '', from: 0 },
    isLoading: false,
    results: null,
};

function reset(state) {
    return {
        ...defaultState,
        query: {
            ...state.query,
            term: '',
            from: 0,
        },
    };
}

function updateQuery(state, action) {
    return {
        ...state,
        query: {
            ...state.query,
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
            query: action.payload,
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
                term: state.query.term,
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
            query: action.payload,
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
                term: state.query.term,
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
    case 'Search.UPDATE_QUERY':
        return updateQuery(state, action);
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
