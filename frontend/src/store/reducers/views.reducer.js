import {viewsConstants} from '../constants';

const initialState={
    profileViews: null,
    pitchViews: null,
    loading:false,
}

export function viewsReducer(state = initialState, action) {
    switch (action.type) {      
        case viewsConstants.ADD_PITCH_VIEW_REQUEST:
            return {
                loading: true
            };
        case viewsConstants.ADD_PITCH_VIEW_SUCCESS:
            return {
                ...state,
                pitchViews: state.pitchViews + 1,
                loading:false,
            };    
        case viewsConstants.ADD_PITCH_VIEW_FAILURE:
            return {};

        case viewsConstants.FETCH_PITCH_VIEWS_REQUEST:
         return {
            loading:true
         }  
         case viewsConstants.FETCH_PITCH_VIEWS_SUCCESS:
        return {
            ...state,
            pitchViews: action.pitchViews,
            loading:false
        }          
        case viewsConstants.FETCH_PITCH_VIEWS_FAILURE:
            return {}
            case viewsConstants.ADD_PROFILE_VIEW_REQUEST:
                return {
                    loading: true
                };
            case viewsConstants.ADD_PROFILE_VIEW_SUCCESS:
                return {
                    ...state,
                    profileViews: state.profileViews + 1,
                    loading:false,
                };    
            case viewsConstants.ADD_PROFILE_VIEW_FAILURE:
                return {};
    
            case viewsConstants.FETCH_PROFILE_VIEWS_REQUEST:
             return {
                loading:true
             }  
             case viewsConstants.FETCH_PROFILE_VIEWS_SUCCESS:
            return {
                ...state,
                profileViews: action.profileViews,
                loading:false
            }          
            case viewsConstants.FETCH_PROFILE_VIEWS_FAILURE:
                return {}

        default:
        return state
    }
    
}
export default viewsReducer