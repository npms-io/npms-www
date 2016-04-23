import Promise from 'bluebird';
import { push } from 'react-router-redux';
import queryString from 'query-string';
import axios from 'axios';
import config from 'config';
import { markAsLoading, unmarkAsLoading } from '../app/actions';

export function updateQuery(query) {
    return {
        type: 'Search.UPDATE_QUERY',
        payload: query,
    };
}

export function resetQueryTerm(query) {
    return {
        type: 'Search.RESET_QUERY_TERM',
        payload: query,
    };
}

export function runQuery(query) {
    return (dispatch) => {
        const queryStr = queryString.stringify(query);

        dispatch(markAsLoading());
        dispatch(push(`/search?${queryStr}`));

        dispatch({
            type: 'Search.RUN_QUERY',
            payload: {
                data: query,
                promise: Promise.resolve(axios.get(`${config.api.url}/search/?${queryStr}`))
                .then((res) => ({ total: res.data.total, items: res.data.results }))
                .timeout(config.api.timeout)
                .finally(() => dispatch(unmarkAsLoading())),
            },
        });
    };
}
