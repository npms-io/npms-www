import { push } from 'react-router-redux';
import queryString from 'query-string';
import uniqueId from 'lodash/uniqueId';
import kebabCase from 'lodash/kebabCase';
import npmsRequest from 'shared/util/npmsRequest';
import { markAsLoading, unmarkAsLoading } from 'shared/state/app/actions';

const resultsPerPage = 25;

function normalizeParams(params) {
    return {
        ...params,
        q: params.q.trim(),
    };
}

function buildApiQueryString(params, settings) {
    const queryObject = { ...params };

    Object.keys(settings).forEach((name) => {
        const hyphenatedName = kebabCase(name);
        const regExp = new RegExp(`${hyphenatedName}:[^\\s]+`);

        if (!regExp.test(params.q)) {
            queryObject.q += ` ${hyphenatedName}:${settings[name]}`;
        }
    });

    return queryString.stringify(queryObject);
}

// --------------------------------------------------

export function updateQuery(q) {
    return {
        type: 'Search.Main.UPDATE_QUERY',
        payload: q,
    };
}

export function reset() {
    return {
        type: 'Search.Main.RESET',
    };
}

export function navigate() {
    return (dispatch, getState) => {
        const params = normalizeParams(getState().search.main.params);

        // Only navigate if we got a query filled in
        if (!params.q) {
            return;
        }

        const queryStr = queryString.stringify({ q: params.q })
        .replace(/%20/g, '+');  // Replace spaces with + because it's prettier

        dispatch(push(`/search?${queryStr}`));
    };
}

export function run() {
    return (dispatch, getState) => {
        const params = normalizeParams(getState().search.main.params);

        // Reset if query is empty
        if (!params.q) {
            return dispatch(reset());
        }

        params.from = 0;

        dispatch(markAsLoading());

        dispatch({
            type: 'Search.Main.RUN',
            meta: { uid: uniqueId('search-') },
            payload: {
                data: params,
                promise: npmsRequest(`/search?${buildApiQueryString(params, getState().search.settings)}`)
                .then((res) => ({ total: res.total, items: res.results }))
                .finally(() => dispatch(unmarkAsLoading())),
            },
        })
        .catch(() => {});  // Search.Main.RUN_REJECTED will be dispatched, so swallow any error
    };
}

export function scroll() {
    return (dispatch, getState) => {
        const state = getState().search.main;
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
            type: 'Search.Main.SCROLL',
            meta: { uid: uniqueId('search') },
            payload: {
                data: params,
                promise: npmsRequest(`/search?${buildApiQueryString(params, getState().search.settings)}`)
                .then((res) => ({ total: res.total, items: res.results }))
                .finally(() => dispatch(unmarkAsLoading())),
            },
        })
        .catch(() => {});  // Search.Main.SCROLL_REJECTED will be dispatched, so swallow any error
    };
}
