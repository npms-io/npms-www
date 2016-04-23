const defaultState = {
    query: { term: '' },
    results: null,
};

function updateQuery(state, action) {
    return {
        ...state,
        query: action.payload,
    };
}

function resetQueryTerm(state) {
    return {
        ...state,
        query: {
            ...state.query,
            term: '',
        },
    };
}

function runQuery(state, action) {
    switch (action.type) {
    case 'Search.RUN_QUERY_PENDING':
        return {
            ...state,
            query: action.payload,
            isLoading: true,
        };
    case 'Search.RUN_QUERY_REJECTED':
        return {
            ...state,
            isLoading: false,
            results: null,
            error: action.error,
        };
    case 'Search.RUN_QUERY_FULFILLED':
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

export function searchReducer(state = defaultState, action) {
    console.log(state, action);
    switch (action.type) {
    case 'Search.UPDATE_QUERY':
        return updateQuery(state, action);
    case 'Search.RESET_QUERY_TERM':
        return resetQueryTerm(state, action);
    case 'Search.RUN_QUERY_PENDING':
    case 'Search.RUN_QUERY_FULFILLED':
    case 'Search.RUN_QUERY_REJECTED':
        return runQuery(state, action);
    default:
        return state;
    }
}

export default searchReducer;
