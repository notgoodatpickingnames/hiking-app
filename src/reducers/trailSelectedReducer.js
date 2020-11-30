import { Trail } from "../trailsInViewComponent/trail";

export const trailSelectedReducer = (state = Trail.empty(), action) => {
    switch(action.type) {
        case 'SELECT_TRAIL': return action.payload ? action.payload : state;
        default: return state;
    }
}