const defaultState = {
    qualityWeight: 1.9,
    popularityWeight: 3.3,
    maintenanceWeight: 2.1,
    boostExact: true,
};

function reset() {
    return defaultState;
}

function update(state, action) {
    return {
        ...state,
        ...action.payload,
    };
}

// --------------------------------------------------

export function settingsReducer(state = defaultState, action) {
    switch (action.type) {
    case 'Search.Settings.RESET':
        return reset(state, action);
    case 'Search.Settings.UPDATE':
        return update(state, action);
    default:
        return state;
    }
}

export default settingsReducer;
