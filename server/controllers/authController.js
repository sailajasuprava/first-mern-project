const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const sendToken = (res, token) => {
  const cookieOptions = {
    expires: new Date(
      // eslint-disable-next-line prettier/prettier
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
};

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
    sendToken(res, token);

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
    sendToken(res, token);

    res.status(200).json({
      status: "success",
      message: "login successful",
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, logIn };
