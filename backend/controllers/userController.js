const asyncHandler = require("express-async-handler");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  console.log("Hemlo");
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
