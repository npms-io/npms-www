import { push } from 'react-router-redux';
import queryString from 'query-string';
import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';
import { markAsLoading, unmarkAsLoading } from '../app/actions';
import npmsRequest from '../util/npmsRequest';

const resultsPerPage = 25;

// TODO: store results in an LRU to improve integration with back button

function buildSearchUrl(query) {
    query = omit(query, 'from', 'size');  // Params that don't go into the URL

    const queryStr = queryString.stringify(query)
    .replace(/%20/g, '+');                // Replace spaces with + because it's prettier

    return `/search${queryStr ? `?${queryStr}` : ''}`;
}

function normalizeQuery(query) {
    return {
        ...query,
        term: query.term.trim(),
    };
}

export function updateQuery(query) {
    return {
        type: 'Search.UPDATE_QUERY',
        payload: query,
    };
}

export function reset() {
    return {
        type: 'Search.RESET',
    };
}

export function navigate() {
    return (dispatch, getState) => {
        const query = normalizeQuery(getState().search.query);

        // Only navigate if we got a term filled in
        query.term && dispatch(push(buildSearchUrl(query)));
    };
}

export function run() {
    return (dispatch, getState) => {
        const query = normalizeQuery(getState().search.query);

        if (!query.term) {
            return dispatch(reset());
        }

        query.from = 0;
        query.size = resultsPerPage;

        dispatch(markAsLoading());

        dispatch({
            type: 'Search.RUN',
            meta: { uid: uniqueId('search-') },
            payload: {
                data: query,
                promise: npmsRequest(`/search?${queryString.stringify(query)}`)
                .then((res) => ({ total: res.total, items: res.results }))
                .finally(() => dispatch(unmarkAsLoading())),
            },
        })
        .catch(() => {});  // Search.RUN_REJECTED will be dispatched, so swallow any error
    };
}

export function scroll() {
    return (dispatch, getState) => {
        const state = getState().search;
        const from = state.results.items.length;

        if (state.isLoading || from >= state.results.total) {
            return;
        }

        const query = normalizeQuery({
            ...state.query,
            ...{ from: state.results.items.length, size: resultsPerPage },
        });

        dispatch(markAsLoading());

        dispatch({
            type: 'Search.SCROLL',
            meta: { uid: uniqueId('search') },
            payload: {
                data: query,
                promise: npmsRequest(`/search?${queryString.stringify(query)}`)
                .then((res) => ({ total: res.total, items: res.results }))
                .finally(() => dispatch(unmarkAsLoading())),
            },
        })
        .catch(() => {});  // Search.SCROLL_REJECTED will be dispatched, so swallow any error
    };
}
