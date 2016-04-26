import { markAsLoading, unmarkAsLoading } from 'shared/state/app/actions';
import store from 'shared/state/store';
import homeRoute from './home';
import searchRoute from './search';

export default [
    // The following routes are part of the main build
    {
        indexRoute: true,
        ...homeRoute,
    },
    // The following routes are part of the main build
    {
        path: '/search',
        ...searchRoute,
    },
    // The rest of the routes are lazy loaded
    {
        path: '/about',
        getComponent(location, callback) {
            store.dispatch(markAsLoading());
            require.ensure([], (require) => {
                callback(null, require('./about').default.component);
                store.dispatch(unmarkAsLoading());
            }, 'about');
        },
        getChildRoutes(location, callback) {
            require.ensure([], (require) => callback(null, require('./about').default.component), 'about');
        },
    },
    {
        path: '/privacy',
        getComponent(location, callback) {
            store.dispatch(markAsLoading());
            require.ensure([], (require) => {
                callback(null, require('./privacy').default.component);
                store.dispatch(unmarkAsLoading());
            }, 'privacy');
        },
        getChildRoutes(location, callback) {
            require.ensure([], (require) => callback(null, require('./privacy').default.component), 'privacy');
        },
    },
    {
        path: '/terms',
        getComponent(location, callback) {
            store.dispatch(markAsLoading());
            require.ensure([], (require) => {
                callback(null, require('./terms').default.component);
                store.dispatch(unmarkAsLoading());
            }, 'terms');
        },
        getChildRoutes(location, callback) {
            require.ensure([], (require) => callback(null, require('./terms').default.component), 'terms');
        },
    },
    {
        path: '/*',
        getComponent(location, callback) {
            store.dispatch(markAsLoading());
            require.ensure([], (require) => {
                callback(null, require('./not-found').default.component);
                store.dispatch(unmarkAsLoading());
            }, 'not-found');
        },
        getChildRoutes(location, callback) {
            require.ensure([], (require) => callback(null, require('./not-found').default.component), 'not-found');
        },
    },
];
