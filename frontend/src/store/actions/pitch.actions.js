import { pitchConstants} from '../constants';
import { alertActions } from './alert.actions';
import { pitchService } from '../services/pitch.service';

export const pitchActions = {
  createPitch,
  fetchPitches,
  getPitch,
};

function createPitch(video) {
    return dispatch => {
        dispatch(request({ video }));
        pitchService.createPitch(video)
            .then(
                data => { 
                    //console.log(data)
                    dispatch(success(data.video));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(video) { return { type: pitchConstants.ADD_VIDEO_REQUEST, video } }
    function success(video) { return { type: pitchConstants.ADD_VIDEO_SUCCESS, video } }
    function failure(error) { return { type: pitchConstants.ADD_VIDEO_FAILURE, error } }
}

function fetchPitches(id) {
    return dispatch => {
        dispatch(request());
        pitchService.fetchPitches(id)
            .then(
                data => { 
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: pitchConstants.FETCH_VIDEOS_REQUEST} }
    function success(videos) { return { type: pitchConstants.FETCH_VIDEO_SUCCESS, videos } }
    function failure(error) { return { type: pitchConstants.FETCH_VIDEO_FAILURE, error } }
}

function getPitch(id) {
    return dispatch => {
        dispatch(request());
        pitchService.getPitch(id)
            .then(
                data => { 
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: pitchConstants.GET_PITCH_REQUEST} }
    function success(video) { return { type: pitchConstants.GET_PITCH_SUCCESS, video } }
    function failure(error) { return { type: pitchConstants.GET_PITCH_FAILURE, error } }
}

