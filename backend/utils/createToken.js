require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.createToken = (email) => {
  const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
  return token;
};

exports.createAccessToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

exports.createUserToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};
