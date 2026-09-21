const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret", {
    expiresIn: "1h",
  });
};

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("Please provide email and password");
      err.statusCode = 400;
      return next(err);
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      const err = new Error("User already exists");
      err.statusCode = 400;
      return next(err);
    }

    const user = await User.create({
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("Please provide email and password");
      err.statusCode = 400;
      return next(err);
    }

    const user = await User.findOne({ email });

    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      return next(err);
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      return next(err);
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      data: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
