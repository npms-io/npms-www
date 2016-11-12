import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
import appReducer from './app/reducer';
import searchReducer from './search/reducer';

export default store;
let store = null;

export function configure(history) {
    const reducer = combineReducers({
        app: appReducer,
        search: searchReducer,
        routing: routerReducer,
    });

    const middlewares = [
        routerMiddleware(history),
        thunkMiddleware,
        promiseMiddleware(),
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
    ];

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;


    store = createStore(reducer, composeEnhancers(...enhancers));

    syncHistoryWithStore(browserHistory, store);

    return store;
}
