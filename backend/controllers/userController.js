const asyncHandler = require("express-async-handler");
const pool = require("../config/db");
const { getDate } = require("../auxiliaries/helperFunctions");

// @desc    Register new user
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, birthDate } = req.body;

  if (!(email && firstName && password && birthDate)) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check this returning * thing later because this might get very slow if we have to return everything
  const newUser = await pool.query(
    "INSERT INTO user_account(email, password, first_name, last_name, birth_date, creation_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [email, password, firstName, lastName, birthDate, getDate()]
  );

  res.json(newUser.rows[0]);
});

// @desc    Log user in
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  
  // idk if this is the right way of doing this but meh let's just see where this goes.
  const user = await pool.query("SELECT * FROM user_account WHERE email = $1", [
    email,
  ]);
  
  const pass = user.rows[0]
  ? await pool.query("SELECT password FROM user_account WHERE email = $1", [
    email,
  ])
  : undefined;

  if (user && pass && (pass.rows[0].password === password)) {
    res.json({
      _id: user.rows[0].user_id,
      firstName: user.rows[0].firstName,
      email: user.rows[0].email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   Get /api/users/me
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const { _id, firstName, email } = await pool.query("SELECT (user_id, firstName, email) WHERE user_id = $1", [req.user.id]);

  res.status(200).json({
    id: _id,
    firstName,
    email
  });
});

module.exports = { registerUser, loginUser, getUser };
