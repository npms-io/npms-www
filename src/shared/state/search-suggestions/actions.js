import uniqueId from 'lodash/uniqueId';
import npmsRequest from '../util/npmsRequest';

const maxResults = 10;

// TODO: Use a LRU to cache results

export function reset() {
    return {
        type: 'SearchSuggestions.RESET',
    };
}

export function fetch(term) {
    return (dispatch, getState) => {
        term = term.trim();

        // Do nothing if current term is the same
        if (getState().searchSuggestions.term === term) {
            return;
        }

        // Reset if term is empty
        if (!term) {
            return dispatch(reset());
        }

        dispatch({
            type: 'SearchSuggestions.FETCH',
            meta: { uid: uniqueId('search-suggestions-') },
            payload: {
                data: term,
                promise: npmsRequest(`/search/suggestions?term=${encodeURIComponent(term)}&size=${maxResults}`),
            },
        })
        .catch(() => {});  // SearchSuggestions.FETCH_REJECTED will be dispatched, so swallow any error
    };
}
