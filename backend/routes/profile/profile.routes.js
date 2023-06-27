const {
  updateDescription,
  updateCapitalGoal,
  updateDevelopmentStage,
  updateCompetences,
  updateMarkets,
  updatePreviousInvestments,
  updateInvestmentInterest,
  updateInvestorCompetences,
  updateCapital,
  updateCalendly,
  getUser,
  updateProfilePicture,
  updateBusinessIndustrys,
  getInvestor,
  getBusiness,
  updateLocation,
  updateIndustries,
} = require("../../controllers/users");
const { isAuthor, auth } = require("../../middleware/auth");

module.exports = function (app) {
  app.get("/user/:id", auth, getUser);
  app.get("/investor/:id", auth, getInvestor);
  app.get("/business/:id", auth, getBusiness);
  app.put("/markets/:id", isAuthor, updateMarkets);
  app.put("/competences/:id", isAuthor, updateCompetences);
  app.put("/description/:id", isAuthor, updateDescription);
  app.post("/profilepicture/:id", isAuthor, updateProfilePicture);
  app.put("/capital/:id", isAuthor, updateCapital);
  app.put("/location/:id", isAuthor, updateLocation);
  app.put("/goal/:id", isAuthor, updateCapitalGoal);
  app.put("/stage/:id", isAuthor, updateDevelopmentStage);
  app.put("/previousinvestments/:id", isAuthor, updatePreviousInvestments);
  app.put("/industrys/:id", isAuthor, updateIndustries);
  app.put("/businessindustry/:id", isAuthor, updateBusinessIndustrys);
  app.put("/investmentinterests/:id", isAuthor, updateInvestmentInterest);
  app.put("/investorcompetences/:id", isAuthor, updateInvestorCompetences);
  app.put("/calendly/:id", isAuthor, updateCalendly);
};
