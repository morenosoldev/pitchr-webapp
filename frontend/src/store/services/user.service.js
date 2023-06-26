import { authHeader } from "../../util/authHeader";
import config from "../../util/AxiosConfig";
import { history } from "../../util/history";

export const userService = {
  login,
  logout,
  registerBusiness,
  registerInvestor,
  updateDescription,
  updateGoal,
  updateCapital,
  updateProfilePicture,
  updateLocation,
  updateIndustry,
  updateCalendly,
  updateCompetences,
  updateDevelopmentStage,
  updateInvestmentPreference,
  getById,
  update,
  delete: _delete,
};

async function login(email, password) {
  return config
    .post("/login", { email: email, password: password })
    .then(({ data }) => {
      setHeadersAndStorage(data);
      return data;
    })
    .catch((err) => {
      throw err;
    });
}

function logout() {
  config.defaults.headers["Authorization"] = "";
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  history.push("/auth/sign-in");
}

function getById(id) {
  const requestOptions = {
    method: "GET",
  };

  return config.get(`/getUser/${id}`, requestOptions);
}

function updateIndustry(industry, id) {
  return config.put(`/updateBusinessIndustry/${id}`, { industry: industry });
}

function updateLocation(location, id) {
  return config.put(`/location/${id}`, { location: location });
}

function updateCompetences(competences, id) {
  return config.put(`/competences/${id}`, {
    competences: competences,
  });
}

function registerInvestor(user) {
  return config.post("/investor", user).then((res) => {
    setHeadersAndStorage(res.data);
    return res.data;
  });
}

function registerBusiness(user) {
  return config.post("/business", user).then((res) => {
    setHeadersAndStorage(res.data);
    return res.data;
  });
}

function updateCalendly(calendly, id) {
  return config.put(`/updateCalendly/${id}`, { calendly: calendly });
}

function updateDescription(description, id) {
  return config.put(`/updateDescription/${id}`, { description: description });
}

function updateCapital(capital, id) {
  return config.put(`/updateCapital/${id}`, { capital: capital });
}

function updateGoal(goal, percentage, id) {
  return config.put(`/updateGoal/${id}`, {
    goal: goal,
    percentage: percentage,
  });
}

function updateProfilePicture(picture, id) {
  return config.post(`/updateProfilePicture/${id}`, { picture: picture });
}

function updateDevelopmentStage(stage, id) {
  return config.put(`/updateStage/${id}`, { development_stage: stage });
}

function updateInvestmentPreference(preferences, id) {
  return config.put(`/updateInvestmentPreference/${id}`, {
    preferences: preferences,
  });
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return config.put(`/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return config.delete(`/users/${id}`, requestOptions).then(handleResponse);
}

const setHeadersAndStorage = ({ user, token }) => {
  config.defaults.headers["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        //location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
