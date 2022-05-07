import { pitchConstants} from '../constants';

const initialState={
    video: null,
    videos: [],
    loading:false,
}

export function pitchReducer(state = initialState, action) {
    switch (action.type) {      
        case pitchConstants.ADD_VIDEO_REQUEST:
            return {
                ...state,
                loading: true
            };
        case pitchConstants.ADD_VIDEO_SUCCESS:
            return {
                ...state,
                video: action.video,
                loading:false,
            };    
        case pitchConstants.ADD_VIDEO_FAILURE:
            return {...state};

        case pitchConstants.FETCH_VIDEOS_REQUEST:
         return {
             ...state,
            loading:true
         }  
         case pitchConstants.FETCH_VIDEO_SUCCESS:
        return {
            ...state,
            videos: action.videos,
            loading:false
        }          
        case pitchConstants.FETCH_VIDEO_FAILURE:
            return {...state}

         case pitchConstants.GET_PITCH_REQUEST:
         return {
             ...state,
            loading:true
         }  
        
         case pitchConstants.GET_PITCH_SUCCESS:
        return {
            ...state,
            video: action.video,
            loading:false
        }          
        case pitchConstants.GET_PITCH_FAILURE:
            return {...state}  
        default:
            return state
    }
    
}
export default pitchReducer