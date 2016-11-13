import forIn from 'lodash/forIn';
import kebabCase from 'lodash/kebabCase';

const defaultState = {
    uid: null,
    params: { q: '', from: 0, size: 25 },
    isLoading: false,
    results: null,
    error: null,
};

// --------------------------------------------------

function normalizeQuery(q, settings) {
    console.log('normalize', q, settings);
    forIn(settings.current, (value, name) => {
        const hyphenatedName = kebabCase(name);
        const regExp = new RegExp(`\\s?${hyphenatedName}:([^\\s]+)`);
        const match = q.match(regExp);

        // TODO: SPACE
        if (match && match[1] === value.toString()) {
            q = q.replace(regExp, '');
        }
    });

    return q.trim();
}

// --------------------------------------------------

function resetReducer(state) {
    return {
        ...defaultState,
        params: {
            ...state.params,
            q: '',
            from: 0,
        },
    };
}

function updateQueryReducer(state, action) {
    return {
        ...state,
        params: {
            ...state.params,
            q: action.payload,
        },
    };
}

function normalizeQueryReducer(state, action) {
    return {
        ...state,
        params: {
            ...state.params,
            q: normalizeQuery(state.params.q, action.meta.settings),
        },
    };
}

function runReducer(state, action) {
    switch (action.type) {
    case 'Search.Main.RUN_PENDING': {
        return {
            ...state,
            uid: action.meta.uid,
            params: { ...state.params, q: normalizeQuery(state.params.q, action.meta.settings), from: 0 }, // removeSettingsFromQuery({ ...state.params, from: 0 }, action.meta.settings),
            isLoading: true,
        };
    }
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

function scrollReducer(state, action) {
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

export function mainReducer(state = defaultState, action) {
    switch (action.type) {
    case 'Search.Main.UPDATE_QUERY':
        return updateQueryReducer(state, action);
    case 'Search.Main.NORMALIZE_QUERY':
        return normalizeQueryReducer(state, action);
    case 'Search.Main.RESET':
        return resetReducer(state, action);
    case 'Search.Main.RUN_PENDING':
    case 'Search.Main.RUN_FULFILLED':
    case 'Search.Main.RUN_REJECTED':
        return runReducer(state, action);
    case 'Search.Main.SCROLL_PENDING':
    case 'Search.Main.SCROLL_FULFILLED':
    case 'Search.Main.SCROLL_REJECTED':
        return scrollReducer(state, action);
    default:
        return state;
    }
}

export default mainReducer;
