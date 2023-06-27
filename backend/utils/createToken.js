require("dotenv").config();

exports.createToken = async (email) => {
  const token = await jwt.sign({ email: email }, process.env.JWT_SECRET);
  return token;
};

exports.createAccessToken = async (id) => {
  const token = await jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

exports.createUserToken = async (user) => {
  const token = await jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};
