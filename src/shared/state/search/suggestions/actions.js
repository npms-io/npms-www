import uniqueId from 'lodash/uniqueId';
import npmsRequest from 'shared/util/npmsRequest';

const maxResults = 10;

function normalizeQuery(query) {
    return query
    .replace(/(\S+:'(?:[^'\\]|\\.)*')|(\S+:"(?:[^"\\]|\\.)*")|\S+:\S+/g, '')  // Remove qualifiers
    .replace(/\s\s*/g, ' ')                                                   // Remove extra spaces left behind
    .trim();
}

// --------------------------------------------------

export function reset() {
    return {
        type: 'Search.Suggestions.RESET',
    };
}

export function fetch(query) {
    return (dispatch, getState) => {
        query = normalizeQuery(query);

        // Do nothing if current query is the same
        if (getState().search.suggestions.query === query) {
            return;
        }

        // Reset if query is empty
        if (!query) {
            return dispatch(reset());
        }

        dispatch({
            type: 'Search.Suggestions.FETCH',
            meta: { uid: uniqueId('search-suggestions-') },
            payload: {
                data: query,
                promise: npmsRequest(`/search/suggestions?q=${encodeURIComponent(query)}&size=${maxResults}`),
            },
        })
        .catch(() => {});  // Search.Suggestions.FETCH_REJECTED will be dispatched, so swallow any error
    };
}
