import { fileConstants, userConstants} from '../constants';
import { alertActions } from './alert.actions';
import FilesService from '../services/files.service';
import { userService } from '../services';

export const fileActions = {
 uploadPitchFile,
 fetchPitchFiles,
 deletePitchFile,
 uploadFile,
 fetchFiles,
 deleteFile,
};

function uploadPitchFile(file) {
    return dispatch => {
        dispatch(request({file}));
        FilesService.uploadPitchFiles(file)
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

    function request(video) { return { type: fileConstants.UPLOAD_PITCH_FILE_REQUEST, video } }
    function success(video) { return { type: fileConstants.UPLOAD_PITCH_FILE_SUCCESS, video } }
    function failure(error) { return { type: fileConstants.UPLOAD_PITCH_FILE_FAILURE, error } }
}



function deletePitchFile(id) {
    return dispatch => {
        dispatch(request(id));
        FilesService.deletePitchFiles(id)
            .then(
                data => { 
                    console.log(data)
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: fileConstants.DELETE_PITCH_FILES_REQUEST } }
    function success(id) { return { type: fileConstants.DELETE_PITCH_FILES_SUCCESS, id} }
    function failure(error) { return { type: fileConstants.DELETE_PITCH_FILES_FAILURE, error } }
}


function fetchPitchFiles(id) {
    return dispatch => {
        dispatch(request());
        FilesService.fetchPitchFiles(id)
            .then(
                data => { 
                    console.log(data);
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
};

    function request() { return { type: fileConstants.FETCH_PITCH_FILES_REQUEST} }
    function success(pitchFiles) { return { type: fileConstants.FETCH_PITCH_FILES_SUCCESS, pitchFiles } }
    function failure(error) { return { type: fileConstants.FETCH_PITCH_FILES_FAILURE, error } }
}



    
function uploadFile(file,id) {
    return dispatch => {
        dispatch(request({file}));
        FilesService.uploadFile(file,id)
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

    function request(file) { return { type: fileConstants.UPLOAD_FILE_REQUEST, file} }
    function success(file) { return { type: fileConstants.UPLOAD_FILE_SUCCESS, file } }
    function failure(error) { return { type: fileConstants.UPLOAD_FILE_FAILURE, error } }
}


    
function deleteFile(id) {
    return dispatch => {
        dispatch(request(id));
        FilesService.deleteFile(id)
            .then(
                data => { 
                    console.log(data);
                    //console.log(data)
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: fileConstants.DELETE_FILES_REQUEST} }
    function success(id) { return { type: fileConstants.DELETE_FILES_SUCCESS, id } }
    function failure(error) { return { type: fileConstants.DELETE_FILES_FAILURE, error } }
}

function fetchFiles(id) {
    return dispatch => {
        dispatch(request());
        FilesService.fetchFiles(id)
            .then(
                data => { 
                    console.log(data);
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
};

    function request() { return { type: fileConstants.FETCH_FILES_REQUEST} }
    function success(files) { return { type: fileConstants.FETCH_FILES_SUCCESS, files } }
    function failure(error) { return { type: fileConstants.FETCH_FILES_FAILURE, error } }
}


