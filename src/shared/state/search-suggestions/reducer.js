const defaultState = {
    uid: null,
    query: '',
    isLoading: false,
    error: null,
    results: null,
};

function reset() {
    return defaultState;
}

function fetch(state, action) {
    switch (action.type) {
    case 'SearchSuggestions.FETCH_PENDING':
        return {
            ...state,
            uid: action.meta.uid,
            query: action.payload,
            isLoading: true,
        };
    case 'SearchSuggestions.FETCH_REJECTED':
        if (state.uid !== action.meta.uid) {
            return state;
        }

        return {
            ...state,
            isLoading: false,
            results: null,
            error: action.payload,
        };
    case 'SearchSuggestions.FETCH_FULFILLED':
        if (state.uid !== action.meta.uid) {
            return state;
        }

        return {
            ...state,
            isLoading: false,
            results: action.payload,
            error: null,
        };
    default:
        throw new Error('Unknown action type');
    }
}

export function searchSuggestions(state = defaultState, action) {
    switch (action.type) {
    case 'SearchSuggestions.RESET':
        return reset(state, action);
    case 'SearchSuggestions.FETCH_PENDING':
    case 'SearchSuggestions.FETCH_FULFILLED':
    case 'SearchSuggestions.FETCH_REJECTED':
        return fetch(state, action);
    default:
        return state;
    }
}

export default searchSuggestions;
