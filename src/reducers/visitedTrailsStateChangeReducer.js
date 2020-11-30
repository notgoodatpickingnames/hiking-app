export const visitedTrailsStateChangeReducer = (state = [], action) => {
    switch(action.type) {
        case 'VISITED_TRAILS_STATE_CHANGE': return action.payload ? action.payload : state;
        default: return state;
    }
}