import { mapReducer } from './mapReducer';
import { trailsInViewReducer } from './trailsInViewReducer';
import { trailSelectedReducer } from './trailSelectedReducer';

import { combineReducers } from 'redux';

export const RootReducer = combineReducers({
    mapReducer,
    trailsInViewReducer,
    trailSelectedReducer
});