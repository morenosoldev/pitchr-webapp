import { userConstants } from '../constants';

const initialState={
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || {},
    isLoggedIn: !localStorage.getItem('user'),
    loading:false,
}

export function authentication(state = initialState, action) {
    console.log(action);
    switch (action.type) {     
        case userConstants.LOGIN_REQUEST:
            return {
                user: action.user,
                token: action.token,
                isLoggedIn: true,
                loading:true,
            };

        case userConstants.LOGIN_SUCCESS:
            return {
                isLoggedIn: true,
                user: action.user,
                token: action.token,
                loading:false,
            };

        case userConstants.LOGIN_FAILURE:
            return {loading:false};

        case userConstants.UPDATE_CAPITAL_REQUEST:
            return {...state, loading: true };
        
        case userConstants.UPDATE_CAPITAL_SUCCESS:
            return {user: {...state.user, available_capital: action.capital} };
        
        case userConstants.UPDATE_CAPITAL_FAILURE:
            return {...state};    

            case userConstants.UPDATE_INDUSTRY_REQUEST:
                return {...state, loading: true };
            
            case userConstants.UPDATE_INDUSTRY_SUCCESS:
                return {user: {...state.user, industry: action.industry} };
            
            case userConstants.UPDATE_INDUSTRY_FAILURE:
                return {...state};    


            case userConstants.UPDATE_PROFILE_PICTURE_REQUEST:
                return {...state, loading: true };
            
            case userConstants.UPDATE_PROFILE_PICTURE_SUCCESS:
                return {user: {...state.user, profile_pic: action.picture} };
            
            case userConstants.UPDATE_PROFILE_PICTURE_FAILURE:
                return {...state};    

            case userConstants.UPDATE_GOAL_REQUEST:
                return {...state, loading: true };
            
            case userConstants.UPDATE_GOAL_SUCCESS:
                return {user: {...state.user, goal: action.goal.goal, percentage: action.goal.percentage} };
            

            case userConstants.UPDATE_GOAL_FAILURE:
                return {...state};   


            case userConstants.UPDATE_STAGE_REQUEST:
                return {...state, loading: true };
            
            case userConstants.UPDATE_STAGE_SUCCESS:
                return {user: {...state.user, development_stage: action.stage} };
            
            case userConstants.UPDATE_STAGE_FAILURE:
                return {...state};   
                
                case userConstants.UPDATE_CALENDLY_REQUEST:
                    return {...state, loading: true };
                
                case userConstants.UPDATE_CALENDLY_SUCCESS:
                    return {user: {...state.user, calendly: action.calendly} };
    
                case userConstants.UPDATE_CALENDLY_FAILURE:
                    return {...state};   

            case userConstants.UPDATE_DESCRIPTION_REQUEST:
                return {...state, loading: true };
            
            case userConstants.UPDATE_DESCRIPTION_SUCCESS:
                return {user: {...state.user, description: action.description}};
            
            case userConstants.UPDATE_DESCRIPTION_FAILURE:
                return {...state};    

                case userConstants.UPDATE_LOCATION_REQUEST:
                    return {...state, loading: true };
                
                case userConstants.UPDATE_LOCATION_SUCCESS:
                    return {user: {...state.user, location: action.location}};
                
                case userConstants.UPDATE_LOCATION_FAILURE:
                    return {...state};    
            
        case userConstants.REGISTER_REQUEST:
            return { loading: true };
        case userConstants.REGISTER_SUCCESS:
            return {
                user: action.user.user,
                token: action.user.token,
                isLoggedIn: true,
                loading:true,
            };
        case userConstants.REGISTER_FAILURE:
            return {};    
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}