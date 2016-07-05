import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import omit from 'lodash/omit';
import appReducers from './app/reducers';
import searchReducers from './search/reducers';

const store = createStore((state = {}) => state, {}, compose(
    applyMiddleware(routerMiddleware(browserHistory), thunkMiddleware, promiseMiddleware()),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

let registeredReducers = {
    app: appReducers,
    search: searchReducers,
};

/**
 * Adds an object of reducers.
 *
 * @param {Object}  reducers     The reducers object, similar to what you would pass to combineReducers
 * @param {Boolean} [apply=true] False to not apply the combined reducer to the store
 */
export function addReducers(reducers, apply) {
    registeredReducers = { ...registeredReducers, ...reducers };
    (apply || apply == null) && applyReducers();
}

/**
 * Removes reducers.
 *
 * @param {Array}   reducers     The reducers names to remove.
 * @param {Boolean} [apply=true] False to not apply the combined reducer to the store
 */
export function removeReducers(reducers, apply) {
    registeredReducers = omit(registeredReducers, reducers);
    (apply || apply == null) && applyReducers();
}

/**
 * Applies the combined reducers to the store.
 */
export function applyReducers() {
    store.replaceReducer(combineReducers(registeredReducers));
}

applyReducers();

export default store;
