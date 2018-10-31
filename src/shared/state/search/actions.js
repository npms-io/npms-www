import { push } from 'react-router-redux';
import queryString from 'query-string';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import uniqueId from 'lodash/uniqueId';
import { markAsLoading, unmarkAsLoading } from '../app/actions';
import npmsRequest from '../../util/npmsRequest';

const resultsPerPage = 25;
const validParams = ['q', 'size', 'from'];

// TODO: store results in an LRU to improve integration with back button

function buildSearchUrl(params) {
    params = omit(params, 'from', 'size'); // Params that don't go into the URL

    const queryStr = queryString.stringify(params)
    .replace(/%20/g, '+'); // Replace spaces with + because it's prettier

    return `/search${queryStr ? `?${queryStr}` : ''}`;
}

function normalizeParams(params) {
    return {
        ...params,
        q: params.q.trim(),
    };
}

export function updateParams(params) {
    return {
        type: 'Search.UPDATE_PARAMS',
        payload: pick(params, validParams),
    };
}

export function reset() {
    return {
        type: 'Search.RESET',
    };
}

export function navigate() {
    return (dispatch, getState) => {
        const params = normalizeParams(getState().search.params);

        // Only navigate if we got a query filled in
        params.q && dispatch(push(buildSearchUrl(params)));
    };
}

export function run() {
    return (dispatch, getState) => {
        const params = normalizeParams(getState().search.params);

        // Reset if query is empty
        if (!params.q) {
            return dispatch(reset());
        }

        params.from = 0;

        dispatch(markAsLoading());

        dispatch({
            type: 'Search.RUN',
            meta: { uid: uniqueId('search-') },
            payload: {
                data: params,
                promise: npmsRequest(`/search?${queryString.stringify(params)}`)
                .then((res) => ({ total: res.total, items: res.results }))
                .finally(() => dispatch(unmarkAsLoading())),
            },
        })
        .catch(() => {}); // Search.RUN_REJECTED will be dispatched, so swallow any error
    };
}

export function scroll() {
    return (dispatch, getState) => {
        const state = getState().search;
        const from = state.results.items.length;

        if (state.isLoading || from >= state.results.total) {
            return;
        }

        const params = normalizeParams({
            ...state.params,
            ...{ from: state.results.items.length, size: resultsPerPage },
        });

        dispatch(markAsLoading());

        dispatch({
            type: 'Search.SCROLL',
            meta: { uid: uniqueId('search') },
            payload: {
                data: params,
                promise: npmsRequest(`/search?${queryString.stringify(params)}`)
                .then((res) => ({ total: res.total, items: res.results }))
                .finally(() => dispatch(unmarkAsLoading())),
            },
        })
        .catch(() => {}); // Search.SCROLL_REJECTED will be dispatched, so swallow any error
    };
}
