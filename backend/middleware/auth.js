const jwt = require("jsonwebtoken");
const config = require("../config/dev");
const User = require("../models/User");

module.exports = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ status: "fail" });
    const decoded = jwt.verify(token, config.jwt_token);
    req.user = decoded;
    const currentUser = User.findById(decoded._id);
    if (!currentUser) {
      return res.status(401).json({
        status: "Fail",
        message: "The user belonging to this token no longer exists.",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Access denied. Sign in again.");
  }
};
