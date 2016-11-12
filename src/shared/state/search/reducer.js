import { combineReducers } from 'redux';
import mainReducer from './main/reducer';
import settingsReducer from './settings/reducer';
import suggestionsReducer from './suggestions/reducer';

export const searchReducer = combineReducers({
    main: mainReducer,
    settings: settingsReducer,
    suggestions: suggestionsReducer,
});

export default searchReducer;
