import { addReducers } from 'shared/state/store';
import Home from './containers/Home';
import reducers from './state/reducers';

addReducers(reducers);

export default {
    component: Home,
    childRoutes: [],
};
