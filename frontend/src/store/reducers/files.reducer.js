import { fileConstants } from "../constants";

const initialState = {
  pitchFiles: [],
  files: [],
  loading: false,
};

function filesReducer(state = initialState, action) {
  console.log("her", action);
  switch (action.type) {
    case fileConstants.UPLOAD_FILE_REQUEST:
      return {
        loading: true,
        files: [],
        ...state,
      };
    case fileConstants.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        files: [...state.files, action.file],
        loading: false,
      };
    case fileConstants.UPLOAD_PITCH_FILE_FAILURE:
      return {
        ...state,
      };
    case fileConstants.FETCH_FILES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case fileConstants.FETCH_FILES_SUCCESS:
      return {
        ...state,
        files: action.files,
        loading: false,
      };
    case fileConstants.FETCH_FILES_FAILURE:
      return {
        loading: false,
        ...state,
      };

    case fileConstants.FETCH_PITCH_FILES_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case fileConstants.FETCH_PITCH_FILES_SUCCESS:
      return {
        ...state,
        pitchFiles: action.pitchFiles,
        loading: false,
      };
    case fileConstants.FETCH_PITCH_FILES_FAILURE:
      return {
        ...state,
      };

    case fileConstants.DELETE_PITCH_FILES_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case fileConstants.DELETE_PITCH_FILES_SUCCESS:
      const newArr = state.pitchFiles.filter((file) => file.id !== action.id);
      console.log(newArr);
      return {
        ...state,
        loading: false,
        pitchFiles: newArr,
      };
    case fileConstants.DELETE_PITCH_FILES_FAILURE:
      return {};

    case fileConstants.DELETE_FILES_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case fileConstants.DELETE_FILES_SUCCESS:
      const newFileArr = state.files.filter((file) => file.id !== action.id);
      console.log(newFileArr);
      return {
        ...state,
        loading: false,
        files: newFileArr,
      };
    case fileConstants.DELETE_FILES_FAILURE:
      return {};

    default:
      return state;
  }
}
export default filesReducer;
