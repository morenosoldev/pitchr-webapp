import { DIR_MODE } from '../constants/constant.mode'
import { DARK_MODE } from '../constants/constant.mode'

const initstate={
    scheme: false,
    rtl:false
}

// Mutations/Reducer
const Mode = (state = initstate,action) =>{
    switch (action.type) {
        case DARK_MODE:
            return Object.assign({}, state, {
                scheme: action.value
            })
        case DIR_MODE:
            return Object.assign({}, state, {
                rtl: action.value
            })
        // case 'SIDEBARCOLORMODE':
        //     return Object.assign({}, state, {
        //         sidebarcolor: action.value
        //     })
        // case 'SIDEBARTYPEMODE':
        //     return Object.assign({}, state, {
        //         sidebarType: [...state.sidebarType, action.value],
               
        //     })
        // case 'SIDEBARACTIVESTYLEMODE':
        //     return Object.assign({}, state, {
        //         sidebarActiveStyle: action.value
                
        //     })
        // case 'NAVBARSTYLEMODE':
        //     return Object.assign({}, state, {
        //         navbarstyle: action.value
                
        //     })
        default:
            return state
    }
}
// Selectores
export const getDarkMode = (state) => state.mode.scheme;
export const getRtlMode = (state) => state.mode.rtl;

export default Mode