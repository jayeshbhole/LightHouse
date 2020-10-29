const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.JWT_ACCESS);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).send("Error Verifying");
  }
};
