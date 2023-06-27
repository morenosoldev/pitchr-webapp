const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Missing token!" });
  }

  jwt.verify(token, "secret", (err, user) => {
    if (err) {
      return res.status(401).json({ error: err });
    }
    req.user = user;
  });

  next();
};

exports.isAuthor = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Missing token!" });
  }

  jwt.verify(token, "secret", (err, user) => {
    if (err) {
      return res.status(401).json({ error: err });
    }
    req.user = user;
  });

  const { id } = req.params;
  const { id: user_id } = req.user;

  if (Number(id) != Number(user_id)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};
