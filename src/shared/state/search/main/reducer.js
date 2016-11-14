import forIn from 'lodash/forIn';
import kebabCase from 'lodash/kebabCase';

const defaultState = {
    uid: null,
    q: '',
    isLoading: false,
    results: null,
    error: null,
};

// --------------------------------------------------

function updateQuery(state, action) {
    return {
        ...state,
        q: action.payload,
    };
}

function normalizeQuery(state, action) {
    const settings = action.payload.settings;
    let q = state.q;

    forIn(settings.current, (value, name) => {
        const hyphenatedName = kebabCase(name);
        const regExp = new RegExp(`\\s?${hyphenatedName}:([^\\s]+)`);
        const match = q.match(regExp);

        // TODO: SPACE
        if (match && match[1] === value.toString()) {
            q = q.replace(regExp, '');
        }
    });

    q = q.trim();

    return {
        ...state,
        q,
    };
}

function tidyQuerySettings(state, action) {
    const changed = action.payload.changed ? action.payload.changed : Object.keys(action.payload.settings.current);
    let q = state.q;

    changed.forEach((name) => {
        const hyphenatedName = kebabCase(name);
        const regExp = new RegExp(`\\s?${hyphenatedName}:([^\\s]+)`);

        q = q.replace(regExp, '');
    });

    return {
        ...state,
        q,
    };
}

function reset() {
    return defaultState;
}

function run(state, action) {
    switch (action.type) {
    case 'Search.Main.RUN_PENDING': {
        return {
            ...state,
            uid: action.meta.uid,
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
                q: state.q,
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
        return updateQuery(state, action);
    case 'Search.Main.NORMALIZE_QUERY':
        return normalizeQuery(state, action);
    case 'Search.Main.TIDY_QUERY_SETTINGS':
        return tidyQuerySettings(state, action);
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
