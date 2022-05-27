const asyncHandler = require("express-async-handler");
const pool = require("../config/db");
const { getDate } = require("../auxiliaries/helperFunctions");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, birthDate } = req.body;

  if (!(email && firstName && password && birthDate)) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check this returning * thing later because this might get very slow if we have to return everything
  const newUser = await pool.query(
    "INSERT INTO user_account (email, password, first_name, last_name, birth_date, creation_date) VALUES($1) RETURNING *",
    [email, password, firstName, lastName, birthDate, getDate()]
  );

  res.json(newUser.rows[0]);
});

// @desc    Log user in
// @route   POST /api/users
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  console.log("Hemlo");
});

// @desc    Get user data
// @route   Get /api/users/me
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  console.log("Hemlo");
});

module.exports = { registerUser, loginUser, getUser };
