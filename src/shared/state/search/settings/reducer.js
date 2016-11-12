const defaultState = {
    qualityWeight: 1.9,
    popularityWeight: 3.3,
    maintenanceWeight: 2.1,
    scoreEffect: 15.3,
    boostExact: true,
};

// --------------------------------------------------

// TODO: Find a module that does this.. every module that I've found is somewhat complex or require a store middleware
const storage = {
    _hasLocalStorage: typeof localStorage !== 'undefined',
    _persistTimer: null,

    read() {
        let state;

        if (this._hasLocalStorage) {
            try {
                const json = localStorage.getItem('npms.state.search.settings');

                state = json && JSON.parse(json);
            } catch (err) {
                console.error('[search.settings reducer] Unable to read state', err);
            }
        }

        return state || null;
    },

    persist(state) {
        if (this._hasLocalStorage) {
            let json;

            try {
                json = JSON.stringify(state);
            } catch (err) {
                console.error('[search.settings reducer] Unable to persist state', err);
            }

            localStorage.setItem('npms.state.search.settings', json);
        }

        return state;
    },

    persistDelayed(state) {
        if (this._hasLocalStorage) {
            this._persistTimer && clearTimeout(this._persistTimer);
            this._persistTimer = setTimeout(() => {
                this.persistTimer = null;
                this.persist(state);
            }, 1000);
        }

        return state;
    },
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
