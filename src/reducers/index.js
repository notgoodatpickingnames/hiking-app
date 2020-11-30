import { mapReducer } from './mapReducer';
import { trailsInViewReducer } from './trailsInViewReducer';

import { combineReducers } from 'redux';

export const RootReducer = combineReducers({
    mapReducer,
    trailsInViewReducer
});