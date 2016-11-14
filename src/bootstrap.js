import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';
import config from 'config';
import buildStore from 'shared/state/store';
import buildRoutes from './routes';
import Application from './app';

console.info('[bootstrap] App config is', config);

// Track page views for this SPA
browserHistory.listen((location) => {
    if (window.ga) {
        window.ga('set', 'page', `${location.pathname + location.search}`);
        window.ga('send', 'pageview');
    }
});

// Build redux store
const store = buildStore(browserHistory);

// Build our routes
const routes = {
    path: '/',
    component: Application,
    childRoutes: buildRoutes(store),
};

// Render our app!
ReactDOM.render(
    <Provider store={ store }>
        <Router history={ browserHistory } routes={ routes } render={ applyRouterMiddleware(useScroll()) }/>
    </Provider>,
    document.querySelector('#root')
);
