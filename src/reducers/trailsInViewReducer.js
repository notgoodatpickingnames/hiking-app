import { MapState } from "../mapArea/mapState";

export const trailsInViewReducer = (state = MapState.empty() , action) => {
    switch(action.type) {
        case 'TRAILS_IN_VIEW_STATE_CHANGE': return action.payload;
        default: return state;
    }
}