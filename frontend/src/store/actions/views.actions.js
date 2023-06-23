import { viewsConstants } from "../constants";
import { alertActions } from "./alert.actions";
import ViewsService from "../services/views.service";

export const viewActions = {
  addProfileViews,
  addPitchViews,
  getProfileViews,
  getPitchViews,
};

function addProfileViews(user_id, visitor_id) {
  return (dispatch) => {
    dispatch(request());
    ViewsService.addProfileView(user_id, visitor_id).then(
      (data) => {
        dispatch(success(data));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: viewsConstants.ADD_PROFILE_VIEW_REQUEST };
  }
  function success() {
    return { type: viewsConstants.ADD_PROFILE_VIEW_SUCCESS };
  }
  function failure(error) {
    return { type: viewsConstants.ADD_PROFILE_VIEW_FAILURE, error };
  }
}

function getProfileViews(id) {
  return (dispatch) => {
    dispatch(request({ id }));
    ViewsService.getProfileViews(id).then(
      (data) => {
        dispatch(success(data));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: viewsConstants.FETCH_PROFILE_VIEWS_REQUEST };
  }
  function success(views) {
    return { type: viewsConstants.FETCH_PROFILE_VIEWS_SUCCESS, views };
  }
  function failure(error) {
    return { type: viewsConstants.FETCH_PROFILE_VIEWS_FAILURE, error };
  }
}

function addPitchViews(user_id, visitor_id) {
  return (dispatch) => {
    dispatch(request());
    ViewsService.addPitchView(user_id, visitor_id).then(
      (data) => {
        dispatch(success(data));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: viewsConstants.ADD_PITCH_VIEW_REQUEST };
  }
  function success() {
    return { type: viewsConstants.ADD_PITCH_VIEW_SUCCESS };
  }
  function failure(error) {
    return { type: viewsConstants.ADD_PITCH_VIEW_FAILURE, error };
  }
}

function getPitchViews(id) {
  return (dispatch) => {
    dispatch(request({ id }));
    ViewsService.getPitchViews(id).then(
      (data) => {
        dispatch(success(data));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: viewsConstants.FETCH_PITCH_VIEWS_REQUEST };
  }
  function success(views) {
    return { type: viewsConstants.FETCH_PITCH_VIEWS_SUCCESS, views };
  }
  function failure(error) {
    return { type: viewsConstants.FETCH_PITCH_VIEWS_FAILURE, error };
  }
}
