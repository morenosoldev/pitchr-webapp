import { authHeader } from "../../util/authHeader";
import config from "../../util/AxiosConfig";

export const pitchService = {
  createPitch,
  fetchPitches,
  fetchSavedPitches,
  savePitch,
  getPitch,
};

function createPitch(data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: { data },
  };

  return config.post("/pitch", requestOptions).then((res) => {
    return res.data;
  });
}

function savePitch(pitchID, userID) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };

  return config
    .post(`/savePitch/${pitchID}/${userID}`, requestOptions)
    .then((res) => {
      return res.data;
    });
}

function fetchSavedPitches(id) {
  return config.get(`/getSavedPitches/${id}`).then((res) => {
    return res.data;
  });
}

function fetchPitches(id) {
  return config.get(`/decks/${id}`).then((res) => {
    return res.data;
  });
}

function getPitch(id) {
  return config.get(`/pitch/${id}`).then((res) => {
    return res.data;
  });
}
