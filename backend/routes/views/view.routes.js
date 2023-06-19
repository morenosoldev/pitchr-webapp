const {
  addProfileView,
  getProfileViews,
  addPitchView,
  getPitchViews,
  addDeckView,
} = require("../../controllers/views");
const { auth } = require("../../middleware/auth");

module.exports = function (app) {
  app.post("/profileview/:userID/:visitorID", auth, addProfileView);
  app.post("/pitchview/:userID/:visitorID", auth, addPitchView);
  app.post("/deckview/:userID/:visitorID", auth, addDeckView);
  app.get("/profileviews/:id", auth, getProfileViews);
  app.get("/pitchviews/:id", auth, getPitchViews);
};
