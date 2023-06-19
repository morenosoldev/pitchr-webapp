const {
  createPitchDeck,
  getPitchDecks,
  getPitchDeck,
} = require("../../controllers/pitchdeck");
const { auth } = require("../../middleware/auth");

module.exports = function (app) {
  app.post("/deck/:id", [auth], createPitchDeck);
  app.get("/deck/:id", [auth], getPitchDeck);
  app.get("/decks/:id", [auth], getPitchDecks);
};
