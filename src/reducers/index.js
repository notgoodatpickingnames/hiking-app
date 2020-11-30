import { mapReducer } from './mapReducer';
import { trailsInViewReducer } from './trailsInViewReducer';
import { trailSelectedReducer } from './trailSelectedReducer';
import { visitedTrailsStateChangeReducer } from './visitedTrailsStateChangeReducer';

import { combineReducers } from 'redux';

export const RootReducer = combineReducers({
    mapReducer,
    trailsInViewReducer,
    trailSelectedReducer,
    visitedTrailsStateChangeReducer
});