import * as storage from './modules/storage';
import pick from 'lodash/pick';
import assignWith from 'lodash/assignWith';

const defaults = {
    qualityWeight: 1.9,
    popularityWeight: 3.3,
    maintenanceWeight: 2.1,
    scoreEffect: 15.3,
    boostExact: true,
};

// --------------------------------------------------

function getInitialState() {
    let persisted = storage.read();

    // Remove extraneous settings
    persisted = pick(persisted, Object.keys(defaults));
    // Ensure new settings are set
    persisted = assignWith(persisted, defaults, (objValue, srcValue) => objValue === undefined ? srcValue : objValue);

    return {
        current: persisted,
        defaults,
    };
}

// --------------------------------------------------

function reset() {
    storage.persistDelayed(defaults);

    return {
        current: defaults,
        defaults,
    };
}

function update(state, action) {
    const current = { ...state.current, ...action.payload };

    storage.persistDelayed(current);

    return {
        current,
        defaults,
    };
}

export function settingsReducer(state = getInitialState(), action) {
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
