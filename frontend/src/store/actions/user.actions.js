import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from "./alert.actions";
import { history } from "../../util/history";
import config from "../../util/AxiosConfig";
import { requestAccessService } from "../services/auth.service";

export const userActions = {
  login,
  logout,
  requestAccess,
  registerInvestor,
  updateDescription,
  updateGoal,
  updateCapital,
  updateInvestmentPreference,
  updateProfilePicture,
  updateLocation,
  updateIndustry,
  updateDevelopmentStage,
  updateCalendly,
  registerBusiness,
  delete: _delete,
};

function login(email, password, from) {
  return (dispatch) => {
    dispatch(request({ email }));
    userService.login(email, password).then(
      (data) => {
        dispatch(success(data.user));

        const type = data.type;
        type == "Investor"
          ? history.push("/investor")
          : history.push("/business");
      },
      (error) => {
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function requestAccess(email) {
  return (dispatch) => {
    dispatch(request({ email }));
    requestAccessService(email).then(
      ({ data }) => {
        dispatch(alertActions.success(data.message));
      },
      (error) => {
        console.log("error", error);
        dispatch(
          alertActions.error("You have already requested access, please wait.")
        );
      }
    );
  };

  function request(email) {
    return { type: userConstants.REQUEST_ACCESS, email };
  }
  function success(text) {
    return { type: userConstants.REQUEST_SUCCESS, text };
  }
  function failure(error) {
    return { type: userConstants.REQUEST_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function registerBusiness(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.registerBusiness(user).then(
      (user) => {
        console.log(user);
        dispatch(success(user));
        history.push("/business");
        dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        console.log(error);
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function registerInvestor(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.registerInvestor(user).then(
      (user) => {
        console.log(user.data);
        dispatch(success(user.data));
        history.push("/investor");
        dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function updateDescription(description, id) {
  return (dispatch) => {
    dispatch(request({ description }));
    userService.updateDescription(description, id).then(
      () => {
        dispatch(success(description));
      },
      (error) => {
        console.log("error", error);
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request(description) {
    return { type: userConstants.UPDATE_DESCRIPTION_REQUEST, description };
  }
  function success(description) {
    return { type: userConstants.UPDATE_DESCRIPTION_SUCCESS, description };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_DESCRIPTION_FAILURE, error };
  }
}

function updateLocation(location, id) {
  return (dispatch) => {
    dispatch(request({ location }));
    userService.updateLocation(location, id).then(
      ({ data }) => {
        dispatch(success(location));
      },
      (error) => {
        console.log("error", error);
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request(location) {
    return { type: userConstants.UPDATE_LOCATION_REQUEST, location };
  }
  function success(location) {
    return { type: userConstants.UPDATE_LOCATION_SUCCESS, location };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_LOCATION_FAILURE, error };
  }
}

function updateProfilePicture(picture, id) {
  return (dispatch) => {
    console.log("her");
    dispatch(request({ picture }));
    userService.updateProfilePicture(picture, id).then(
      ({ data }) => {
        console.log("lets gooo");
        dispatch(success(picture));
      },
      (error) => {
        console.log("error", error);
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request(picture) {
    return { type: userConstants.UPDATE_PROFILE_PICTURE_REQUEST, picture };
  }
  function success(picture) {
    return { type: userConstants.UPDATE_PROFILE_PICTURE_SUCCESS, picture };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_PROFILE_PICTURE_FAILURE, error };
  }
}

function updateCapital(capital, id) {
  return (dispatch) => {
    dispatch(request({ capital }));
    userService.updateCapital(capital, id).then(
      ({ data }) => {
        dispatch(success(capital));
      },
      (error) => {
        console.log("error", error);
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request(user) {
    return { type: userConstants.UPDATE_CAPITAL_REQUEST, user };
  }
  function success(capital) {
    return { type: userConstants.UPDATE_CAPITAL_SUCCESS, capital };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_CAPITAL_FAILURE, error };
  }
}

function updateIndustry(industry, id) {
  return (dispatch) => {
    dispatch(request({ industry }));
    userService.updateIndustry(industry, id).then(
      ({ data }) => {
        dispatch(success(industry));
      },
      (error) => {
        console.log("error", error);
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request(user) {
    return { type: userConstants.UPDATE_INDUSTRY_REQUEST, user };
  }
  function success(industry) {
    return { type: userConstants.UPDATE_INDUSTRY_SUCCESS, industry };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_INDUSTRY_FAILURE, error };
  }
}

function updateCalendly(calendly, id) {
  return (dispatch) => {
    dispatch(request({ calendly }));
    userService.updateCalendly(calendly, id).then(
      ({ data }) => {
        console.log(data);
        dispatch(success(data));
      },
      (error) => {
        console.log("error", error);
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request(user) {
    return { type: userConstants.UPDATE_CALENDLY_REQUEST, user };
  }
  function success(calendly) {
    return { type: userConstants.UPDATE_CALENDLY_SUCCESS, calendly };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_CALENDLY_FAILURE, error };
  }
}

function updateGoal(goal, percentage, id) {
  return (dispatch) => {
    dispatch(request());
    userService.updateGoal(goal, percentage, id).then(
      ({ data }) => {
        console.log(data);
        dispatch(success({ goal: goal, percentage: percentage }));
      },
      (error) => {
        console.log("error", error);
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request(user) {
    return { type: userConstants.UPDATE_GOAL_REQUEST, user };
  }
  function success(goal) {
    return { type: userConstants.UPDATE_GOAL_SUCCESS, goal };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_GOAL_FAILURE, error };
  }
}

function updateDevelopmentStage(stage, id) {
  return (dispatch) => {
    dispatch(request());
    userService.updateDevelopmentStage(stage, id).then(
      ({ data }) => {
        console.log(data);
        dispatch(success(stage));
      },
      (error) => {
        console.log("error", error);
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request(user) {
    return { type: userConstants.UPDATE_STAGE_REQUEST, user };
  }
  function success(stage) {
    return { type: userConstants.UPDATE_STAGE_SUCCESS, stage };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_USER_FAILURE, error };
  }
}

function updateInvestmentPreference(preferences, id) {
  return (dispatch) => {
    dispatch(request({ preferences }));
    userService.updateInvestmentPreference(preferences, id).then(
      ({ data }) => {
        console.log(data);
        dispatch(success(data));
      },
      (error) => {
        console.log("error", error);
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request(preferences) {
    return { type: userConstants.UPDATE_PREFERENCE_REQUEST, preferences };
  }
  function success(preferences) {
    return { type: userConstants.UPDATE_PREFERENCE_SUCCESS, preferences };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_USER_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      (user) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
