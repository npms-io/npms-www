import { navigate, tidyQuerySettings } from '../main/actions';

let rerunSearchTimer;

function rerunSearch(dispatch) {
    rerunSearchTimer && clearTimeout(rerunSearchTimer);
    rerunSearchTimer = setTimeout(() => {
        rerunSearchTimer = null;

        if (location.pathname === '/search') {
            dispatch(navigate({ replace: true }));
        }
    }, 500);
}

// -----------------------------------------

export function reset() {
    return (dispatch) => {
        dispatch({
            type: 'Search.Settings.RESET',
        });

        // Remove all settings from the query string
        dispatch(tidyQuerySettings());

        // Re-run search
        rerunSearch(dispatch);
    };
}

export function update(settings) {
    return (dispatch) => {
        dispatch({
            type: 'Search.Settings.UPDATE',
            payload: settings,
        });

        // Remove changed settings from the query string
        dispatch(tidyQuerySettings(Object.keys(settings)));

        // Re-run search
        rerunSearch(dispatch);
    };
}
