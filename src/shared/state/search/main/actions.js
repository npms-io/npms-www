import { push as pushUrl, replace as replaceUrl } from 'react-router-redux';
import uniqueId from 'lodash/uniqueId';
import npmsRequest from 'shared/util/npmsRequest';
import { markAsLoading, unmarkAsLoading } from 'shared/state/app/actions';
import * as queryString from './modules/queryString';

const resultsPerPage = 25;

// --------------------------------------------------

export function updateQuery(q) {
    return {
        type: 'Search.Main.UPDATE_QUERY',
        payload: q,
    };
}

export function normalizeQuery() {
    return (dispatch, getState) => dispatch({
        type: 'Search.Main.NORMALIZE_QUERY',
        payload: {
            settings: getState().search.settings,
        },
    });
}

export function tidyQuerySettings(changed) {
    return (dispatch, getState) => dispatch({
        type: 'Search.Main.TIDY_QUERY_SETTINGS',
        payload: {
            changed,
            settings: getState().search.settings,
        },
    });
}

export function reset() {
    return {
        type: 'Search.Main.RESET',
    };
}

export function navigate(options) {
    options = Object.assign({ replace: false }, options);

    return (dispatch, getState) => {
        dispatch(normalizeQuery());

        const q = getState().search.main.q;
        const settings = getState().search.settings;

        const queryStr = queryString.buildForApp(q, settings);
        const url = `/search${queryStr ? `?${queryStr}` : ''}`;

        const willNavigate = location.pathname + location.search !== url;

        willNavigate && dispatch(options.replace ? replaceUrl(url) : pushUrl(url));

        return willNavigate;
    };
}

export function run() {
    return (dispatch, getState) => {
        // Keep URL always updated, even when entering via deeplinking
        const navigated = dispatch(navigate({ replace: true }));

        if (navigated) {
            return;
        }

        const q = getState().search.main.q;
        const settings = getState().search.settings;

        // Reset if query is empty
        if (!q) {
            return dispatch(reset());
        }

        const params = { q, from: 0, size: resultsPerPage };

        dispatch(markAsLoading());

        dispatch({
            type: 'Search.Main.RUN',
            meta: { uid: uniqueId('search-') },
            payload: {
                promise: npmsRequest(`/search?${queryString.buildForApi(params, settings)}`)
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
        const settings = getState().search.settings;

        if (state.isLoading || state.results.items.length >= state.results.total) {
            return;
        }

        const params = { q: state.results.q, from: state.results.items.length, size: resultsPerPage };

        dispatch(markAsLoading());

        dispatch({
            type: 'Search.Main.SCROLL',
            meta: { uid: uniqueId('search') },
            payload: {
                promise: npmsRequest(`/search?${queryString.buildForApi(params, settings)}`)
                .then((res) => ({ total: res.total, items: res.results }))
                .finally(() => dispatch(unmarkAsLoading())),
            },
        })
        .catch(() => {});  // Search.Main.SCROLL_REJECTED will be dispatched, so swallow any error
    };
}
