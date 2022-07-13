const asyncHandler = require("express-async-handler");
const pool = require("../config/db");
const { getDate } = require("../auxiliaries/helperFunctions");

/**
 * @desc   Add a new platform
 * @route  POST /api/platform/
 * @access Private - Admin
 */
const addPlatform = asyncHandler(async (req, res) => {
  const { platform_name } = req.body;

  const newPlatform = await pool.query(
    "INSERT INTO platform (platform_name) VALUES ($1) RETURNING *",
    [platform_name]
  );

  res
    .status(newPlatform ? 201 : 401)
    .json(newPlatform ? newPlatform.rows[0] : { message: "failed to add" });
});

/**
 * @desc   Get individual or all platforms
 * @route  GET /api/platform/:id
 * @access Private - Admin
 */
const getPlatform = asyncHandler(async (req, res) => {
  const { platform_id } = req.params;

  if (platform_id) {
    const platform = await pool.query(
      "SELECT * FROM platform WHERE platform_id = $1",
      [platform_id]
    );

    res
      .status(platform ? 200 : 404)
      .json(platform ? platform.rows[0] : { message: "platform not found" });
  } else {
    const platforms = await pool.query("SELECT * FROM platform");

    res
      .status(platforms ? 200 : 404)
      .json(platforms ? platforms.rows : { message: "platforms not found" });
  }
});


module.exports = { addPlatform, getPlatform };