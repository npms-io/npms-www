import { push as pushUrl, replace as replaceUrl } from 'react-router-redux';
import queryString from 'query-string';
import uniqueId from 'lodash/uniqueId';
import omit from 'lodash/omit';
import forIn from 'lodash/forIn';
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

    forIn(settings.current, (value, name) => {
        const hyphenatedName = kebabCase(name);
        const regExp = new RegExp(`${hyphenatedName}:[^\\s]+`);

        if (!regExp.test(params.q)) {
            queryObject.q += ` ${hyphenatedName}:${value}`;
        }
    });

    return queryString.stringify(queryObject);
}

function buildQueryString(params, settings) {
    const queryObject = omit(params, 'from', 'size');

    forIn(settings.current, (value, name) => {
        const hyphenatedName = kebabCase(name);
        const regExp = new RegExp(`\\s?${hyphenatedName}:([^\\s]+)`);
        const match = params.q.match(regExp);
        const queryValue = match ? match[1] : value.toString();

        queryObject.q = queryObject.q.replace(regExp, '');

        if (settings.defaults[name].toString() !== queryValue || value.toString() !== queryValue) {
            queryObject.q += ` ${hyphenatedName}:${queryValue}`;
        }
    });

    return queryString.stringify(queryObject).replace(/%20/g, '+');  // Replace spaces with + because it's prettier
}

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
        meta: { settings: getState().search.settings },
    });
}

export function reset() {
    return {
        type: 'Search.Main.RESET',
    };
}

export function navigate(replace) {
    return (dispatch, getState) => {
        const params = normalizeParams(getState().search.main.params);
        const settings = getState().search.settings;

        // Only navigate if we got a query filled in
        if (!params.q) {
            return;
        }

        const queryStr = buildQueryString(params, settings);
        const url = `/search?${queryStr}`;

        // Navigate or normalize query
        if (location.pathname + location.search !== url) {
            dispatch(replace ? replaceUrl(url) : pushUrl(url));
        } else {
            dispatch(normalizeQuery());
        }
    };
}

export function run() {
    return (dispatch, getState) => {
        const params = getState().search.main.params;
        const settings = getState().search.settings;

        // Reset if query is empty
        if (!params.q.trim()) {
            return dispatch(reset());
        }

        dispatch(markAsLoading());

        dispatch({
            type: 'Search.Main.RUN',
            meta: { uid: uniqueId('search-'), settings },
            payload: {
                promise: npmsRequest(`/search?${buildApiQueryString(params, settings)}`)
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

        // TODO: Bug!!! Do not use current state
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
