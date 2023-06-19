const {
  insertMRR,
  getFinancialData,
  createFinancial,
  deleteFinancial,
} = require("../../controllers/financials");
const { auth } = require("../../middleware/auth");

module.exports = function (app) {
  app.post("/financial/:id", [auth], createFinancial);
  app.delete("/financial/:id", [auth], deleteFinancial);
  app.get("/financials/:id", [auth], getFinancialData);
};
