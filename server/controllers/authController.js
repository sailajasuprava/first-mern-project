const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const signUp = async (req, res, next) => {
  try {
    const { fullname, email, password, passwordConfirm } = req.body;
    const newUser = await User.create({
      fullname,
      email,
      password,
      passwordConfirm,
    });

    const token = generateToken(newUser._id);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      token,
    });
  } catch (err) {
    next(err);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password.", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError("Incorrect  email or password.", 401));
    }

    const token = generateToken(user._id);

    res.status(200).json({
      status: "success",
      message: "login successful",
      token,
    });
  } catch (err) {
    next(err);
  }
};

const protect = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer")) {
      return next(new AppError("You are not logged in"), 401);
    }

    const token = authorization.split(" ")[1];
    const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);

    if (!user) {
      return next(new AppError("User doesn't exist."), 401);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, logIn, protect };
