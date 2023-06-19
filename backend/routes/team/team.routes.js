const {
  addMember,
  deleteMember,
  getTeamMembers,
} = require("../../controllers/team");
const { auth } = require("../../middleware/auth");

module.exports = function (app) {
  app.post("/member/:id", auth, addMember);
  app.delete("/member/:id", auth, deleteMember);
  app.get("/members/:id", auth, getTeamMembers);
};
