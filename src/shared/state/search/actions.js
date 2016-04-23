import Promise from 'bluebird';
import { push } from 'react-router-redux';
import queryString from 'query-string';
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
        dispatch(markAsLoading());
        dispatch(push(`/search?${queryString.stringify(query)}`));

        dispatch({
            type: 'Search.RUN_QUERY',
            payload: {
                data: query,
                promise: Promise.delay(1000).return({
                    total: 2,
                    items: [
                        { name: `foo-${~~(Math.random() * 10000)}` },
                        { name: `bar-${~~(Math.random() * 10000)}` },
                    ],
                })
                .finally(() => dispatch(unmarkAsLoading())),
            },
        });
    };
}
