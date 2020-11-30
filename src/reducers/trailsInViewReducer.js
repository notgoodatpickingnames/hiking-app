export const trailsInViewReducer = (state = [], action) => {
    switch(action.type) {
        case 'TRAILS_IN_VIEW_STATE_CHANGE': return action.payload ? action.payload : state;
        default: return state;
    }
}