import { MapState } from "../mapArea/mapState";

export const mapReducer = (state = MapState.empty() , action) => {
    switch(action.type) {
        case 'MAP_STATE_CHANGE': return action.payload;
        default: return state;
    }
}