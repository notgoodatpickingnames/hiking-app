import { Trail } from "../trailsInViewComponent/trail";

export const trailSelectedReducer = (state = Trail.empty(), action) => {
    switch(action.type) {
        case 'TRAIL_SELECTED': return action.payload ? action.payload : state;
        default: return state;
    }
}