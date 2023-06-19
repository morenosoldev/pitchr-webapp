const {
  createPitch,
  fetchPitches,
  savePitch,
  getSavedPitches,
  getDevelopmentPitch,
  getPitch,
  publishPitch,
} = require("../../controllers/pitch");
const { auth } = require("../../middleware/auth");

module.exports = function (app) {
  app.post("/pitch/:id", auth, createPitch);
  app.get("/developmentPitch/:id", auth, getDevelopmentPitch);
  app.get("/pitches/:id", auth, fetchPitches);
  app.post("/publish/:id", auth, publishPitch);
  app.get("/pitch/:id", auth, getPitch);
  app.post("/savePitch/:pitchID/:investorID", auth, savePitch);
  app.get("/getSavedPitches/:id", auth, getSavedPitches);
};
