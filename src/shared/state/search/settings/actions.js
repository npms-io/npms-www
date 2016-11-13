import { navigate } from '../main/actions';

let rerunSearchTimer;

function rerunSearch(dispatch, getState) {
    const currentSearchUid = getState().search.main.uid;

    if (currentSearchUid) {
        rerunSearchTimer && clearTimeout(rerunSearchTimer);
        rerunSearchTimer = setTimeout(() => {
            rerunSearchTimer = null;
            currentSearchUid === getState().search.main.uid && dispatch(navigate(true));
        }, 500);
    }
}

// -----------------------------------------

export function reset() {
    return (dispatch, getState) => {
        dispatch({
            type: 'Search.Settings.RESET',
        });

        // Update search if visible
        rerunSearch(dispatch, getState);
    };
}

export function update(settings) {
    return (dispatch, getState) => {
        dispatch({
            type: 'Search.Settings.UPDATE',
            payload: settings,
        });

        // Update search if visible
        rerunSearch(dispatch, getState);
    };
}
