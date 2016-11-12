import storage from './modules/storage';

const defaultState = {
    qualityWeight: 1.9,
    popularityWeight: 3.3,
    maintenanceWeight: 2.1,
    scoreEffect: 15.3,
    boostExact: true,
};

// --------------------------------------------------

function resetReducer() {
    return defaultState;
}

function updateReducer(state, action) {
    return {
        ...state,
        ...action.payload,
    };
}

export function settingsReducer(state = storage.read() || defaultState, action) {
    switch (action.type) {
    case 'Search.Settings.RESET':
        return storage.persistDelayed(resetReducer(state, action));
    case 'Search.Settings.UPDATE':
        return storage.persistDelayed(updateReducer(state, action));
    default:
        return state;
    }
}

export default settingsReducer;
