import uniqueId from 'lodash/uniqueId';
import npmsRequest from '../../util/npmsRequest';

const maxResults = 10;

// TODO: Use a LRU to cache results

export function reset() {
    return {
        type: 'SearchSuggestions.RESET',
    };
}

export function fetch(text) {
    return (dispatch, getState) => {
        text = text.trim();

        // Do nothing if current text is the same
        if (getState().searchSuggestions.text === text) {
            return;
        }

        // Reset if text is empty
        if (!text) {
            return dispatch(reset());
        }

        dispatch({
            type: 'SearchSuggestions.FETCH',
            meta: { uid: uniqueId('search-suggestions-') },
            payload: {
                data: text,
                promise: npmsRequest(`/search/suggestions?text=${encodeURIComponent(text)}&size=${maxResults}`),
            },
        })
        .catch(() => {});  // SearchSuggestions.FETCH_REJECTED will be dispatched, so swallow any error
    };
}
