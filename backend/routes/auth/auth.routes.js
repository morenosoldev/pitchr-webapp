const {
  verifyUser,
  business_signup,
  investor_signup,
  signin,
  request_file_access,
  verifyFileAccess,
  hasFileAccess,
} = require("../../controllers/auth");

module.exports = function (app) {
  app.post("/login", signin);
  app.post("/business", business_signup);
  app.post("/investor", investor_signup);
  app.post("/requestFileAccess", request_file_access);
  app.post("/hasFileAccess", hasFileAccess);
  app.get("/confirm/:confirmationCode", verifyUser);
  app.get("/confirmAccess/:confirmationCode", verifyFileAccess);
};
