import { MapState } from "../mapAreaComponent/mapState";

export const mapReducer = (state = MapState.empty() , action) => {
    switch(action.type) {
        case 'MAP_STATE_CHANGE': return action.payload ? action.payload : state;
        default: return state;
    }
}