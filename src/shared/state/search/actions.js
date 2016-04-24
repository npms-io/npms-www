import { push } from 'react-router-redux';
import queryString from 'query-string';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import { markAsLoading, unmarkAsLoading } from '../app/actions';
import apiRequest from '../../util/apiRequest';

const resultsPerPage = 50;

function buildSearchUrl(query) {
    let queryStr;

    query = omit(query, 'from', 'size');  // Params that don't go into the URL

    if (isEmpty(query)) {
        queryStr = '';
    } else {
        queryStr = queryString.stringify(query)
        .replace(/%20/g, '+');                // Replace spaces with + because it's prettier
    }

    return `/search${queryStr ? `?${queryStr}` : ''}`;
}

export function updateQuery(query) {
    return {
        type: 'Search.UPDATE_QUERY',
        payload: query,
    };
}

export function reset(query) {
    return {
        type: 'Search.RESET',
        payload: query,
    };
}

export function run() {
    return (dispatch, getState) => {
        const query = getState().search.query;

        if (!query.term) {
            return;
        }

        query.from = 0;
        query.size = resultsPerPage;

        dispatch(markAsLoading());
        dispatch(push(buildSearchUrl(query)));

        dispatch({
            type: 'Search.RUN',
            meta: { uid: uniqueId('search-') },
            payload: {
                data: query,
                promise: apiRequest(`/search/?${queryString.stringify(query)}`)
                .then((res) => ({ total: res.total, items: res.results }))
                .finally(() => dispatch(unmarkAsLoading())),
            },
        });
    };
}

export function scroll() {
    return (dispatch, getState) => {
        const state = getState().search;
        const from = state.results.items.length;

        if (state.isLoading || from >= state.results.total) {
            return;
        }

        const query = Object.assign({}, state.query, { from: state.results.items.length, size: resultsPerPage });

        dispatch(markAsLoading());
        dispatch(push(buildSearchUrl(query)));

        dispatch({
            type: 'Search.SCROLL',
            meta: { uid: uniqueId('search') },
            payload: {
                data: query,
                promise: apiRequest(`/search/?${queryString.stringify(query)}`)
                .then((res) => ({ total: res.total, items: res.results }))
                .finally(() => dispatch(unmarkAsLoading())),
            },
        });
    };
}
