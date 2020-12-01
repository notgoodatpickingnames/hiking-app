import { Trail } from "../trailsInViewComponent/trail";

export const trailSelectedReducer = (state = Trail.empty(), action) => {
    switch(action.type) {
        // The trail needs to be duplicated which will trigger a state change even if the user selected the same trail.
        case 'SELECT_TRAIL': return action.payload ? Trail.duplicate(action.payload) : state;
        default: return state;
    }
}