const {
  getAllUsers,
  updateDescription,
  updateCapitalGoal,
  updateDevelopmentStage,
  updateCompetences,
  updateMarkets,
  updatePreviousInvestments,
  updateIndustrys,
  updateInvestmentInterest,
  updateInvestorCompetences,
  updateCapital,
  updateCalendly,
  getUser,
  updateProfilePicture,
  getChatProfile,
  updateBusinessIndustrys,
  updateBusinessMarkets,
  getInvestor,
  getBusiness,
  updateLocation,
} = require("../../controllers/users");
const { auth } = require("../../middleware/auth");

module.exports = function (app) {
  app.get("/getAllUsers", auth, getAllUsers);
  app.get("/getUser/:id", auth, getUser);
  app.get("/getInvestor/:id", auth, getInvestor);
  app.get("/getChatProfile/:id", auth, getChatProfile);
  app.get("/business/:id", auth, getBusiness);

  app.put("/updateMarkets/:id", auth, updateMarkets);
  app.put("/updateBusinessMarkets/:id", auth, updateBusinessMarkets);
  app.put("/competences/:id", auth, updateCompetences);
  app.put("/updateDescription/:id", auth, updateDescription);
  app.post("/updateProfilePicture/:id", auth, updateProfilePicture);
  app.put("/updateCapital/:id", auth, updateCapital);
  app.put("/location/:id", auth, updateLocation);

  app.put("/updateGoal/:id", auth, updateCapitalGoal);
  app.put("/updateStage/:id", auth, updateDevelopmentStage);
  app.put("/updatePreviousInvestments/:id", auth, updatePreviousInvestments);
  app.put("/updateIndustrys/:id", auth, updateIndustrys);
  app.put("/updateBusinessIndustry/:id", auth, updateBusinessIndustrys);
  app.put("/updateInvestmentInterests/:id", auth, updateInvestmentInterest);
  app.put("/updateInvestorCompetences/:id", auth, updateInvestorCompetences);
  app.put("/updateCalendly/:id", auth, updateCalendly);
};
