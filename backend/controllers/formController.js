const asyncHandler = require("express-async-handler");

// @desc    Handle submitted digitalize form
// @route   POST /api/form/digitalize
// @access  Public
const digitalizeForm = asyncHandler(async (req, res) => {
  console.log("hemlo");
});

// @desc    Handle submitted control form
// @route   POST /api/form/control
// @access  Private
const controlForm = asyncHandler(async (req, res) => {
  console.log("hemlo");
});

module.exports = { digitalizeForm, controlForm };
