// TODO: Find a module that does this.. every module that I've found is somewhat complex or require a store middleware

const hasLocalStorage = typeof localStorage !== 'undefined';
let persistTimer = null;

function read() {
    let state;

    if (hasLocalStorage) {
        try {
            const json = localStorage.getItem('npms.state.search.settings');

            state = json && JSON.parse(json);
        } catch (err) {
            console.error('[search.settings reducer] Unable to read state', err);
        }
    }

    return state || null;
}

function persist(state) {
    if (hasLocalStorage) {
        let json;

        try {
            json = JSON.stringify(state);
        } catch (err) {
            console.error('[search.settings reducer] Unable to persist state', err);
        }

        localStorage.setItem('npms.state.search.settings', json);
    }

    return state;
}

function persistDelayed(state) {
    if (hasLocalStorage) {
        persistTimer && clearTimeout(persistTimer);
        persistTimer = setTimeout(() => {
            persistTimer = null;
            persist(state);
        }, 1000);
    }

    return state;
}

export default {
    read,
    persist,
    persistDelayed,
};
