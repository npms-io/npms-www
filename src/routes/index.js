import { markAsLoading, unmarkAsLoading } from 'shared/state/app/actions';
import { get as getStore } from 'shared/state/store';
import homeRoute from './home';
import searchRoute from './search';

// TODO: Handle require.ensure error
// TODO: Use https://github.com/nfl/react-helmet to update document title

function startLoading() {
    let timeout = setTimeout(() => {
        timeout = null;
        getStore().dispatch(markAsLoading());
    }, 1);

    return () => {
        if (!timeout) {
            getStore().dispatch(unmarkAsLoading());
        } else {
            clearTimeout(timeout);
        }
    };
}

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
            const doneLoading = startLoading();

            require.ensure([], (require) => {
                doneLoading();
                callback(null, require('./about').default.component);
            }, 'about');
        },
        getChildRoutes(location, callback) {
            require.ensure([], (require) => callback(null, require('./about').default.component), 'about');
        },
    },
    {
        path: '/privacy',
        getComponent(location, callback) {
            const doneLoading = startLoading();

            require.ensure([], (require) => {
                doneLoading();
                callback(null, require('./privacy').default.component);
            }, 'privacy');
        },
        getChildRoutes(location, callback) {
            require.ensure([], (require) => callback(null, require('./privacy').default.component), 'privacy');
        },
    },
    {
        path: '/terms',
        getComponent(location, callback) {
            const doneLoading = startLoading();

            require.ensure([], (require) => {
                doneLoading();
                callback(null, require('./terms').default.component);
            }, 'terms');
        },
        getChildRoutes(location, callback) {
            require.ensure([], (require) => callback(null, require('./terms').default.component), 'terms');
        },
    },
    {
        path: '/*',
        getComponent(location, callback) {
            const doneLoading = startLoading();

            require.ensure([], (require) => {
                doneLoading();
                callback(null, require('./not-found').default.component);
            }, 'not-found');
        },
        getChildRoutes(location, callback) {
            require.ensure([], (require) => callback(null, require('./not-found').default.component), 'not-found');
        },
    },
];
