const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "default_secret"
      );

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      const err = new Error("Not authorized, token failed");
      err.statusCode = 401;
      return next(err);
    }
  }

  if (!token) {
    const err = new Error("Not authorized, no token");
    err.statusCode = 401;
    return next(err);
  }
};

module.exports = { protect };
