import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

const rootReducer = combineReducers({
    router: routerStateReducer
});

export default rootReducer;