const asyncHandler = require("express-async-handler");
const pool = require("../config/db");
const { getDate, generateToken } = require("../auxiliaries/helperFunctions");
const bcrypt = require("bcryptjs/dist/bcrypt");

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, phoneNumber } = req.body;

  // User does not properly fill in all fields
  if (!(fullName && email && password && phoneNumber)) {
    res.status(400);
    throw new Error("Please complete all required fields.");
  }

  // User already exists
  const userExists = await pool.query(
    "SELECT * FROM user_account WHERE email = $1",
    [email]
  );

  if (userExists.rows.length > 0) {
    res.status(400);
    throw new Error("User already exists.");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  // Insert user data
  const newUser = await pool.query(
    "INSERT INTO user_account (full_name, email, password, phone_number, creation_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [fullName, email, hashedPass, phoneNumber, getDate()]
  );

  if (newUser) {
    const user = newUser.rows[0];

    res.status(201).json({
      user_id: user.user_id,
      fullName: user.full_name,
      email: user.email,
      token: generateToken(user.user_id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Log user in
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // User does not properly fill in all fields
  if (!(email && password)) {
    res.status(400);
    throw new Error("Please complete all required fields.");
  }

  // Retrieve user
  const user = await pool.query("SELECT * FROM user_account WHERE email = $1", [
    email,
  ]);

  if (user.rows[0] && (await bcrypt.compare(password, user.rows[0].password))) {
    const userRow = user.rows[0];

    res.json({
      user_id: userRow.user_id,
      fullName: userRow.full_name,
      email: userRow.email,
      token: generateToken(userRow.user_id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/users/dashboard
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const request = await pool.query(
    "SELECT * FROM user_account WHERE user_id = $1",
    [req.user.user_id]
  );
  const { user_id, fullName, email } = request.rows[0];

  res.status(200).json({
    user_id,
    fullName,
    email,
  });
});

// @desc    Delete user data
// @route   DELETE /api/users/delete
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const process = await pool.query(
    "DELETE FROM user_account WHERE user_id = $1",
    [req.body.user_id]
  );

  if (process) {
    res.status(200).json("success");
  } else {
    res.status(400);
    throw new Error("Failed to delete.");
  }
});

module.exports = { registerUser, loginUser, getUser, deleteUser };
