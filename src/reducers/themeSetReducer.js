import { Theme } from "../themeToggleComponent/themes";

export const themeSetReducer = (state = Theme.LightMode, action) => {
    switch(action.type) {
        case 'SET_THEME': return action.payload ? action.payload : state;
        default: return state;
    }
}