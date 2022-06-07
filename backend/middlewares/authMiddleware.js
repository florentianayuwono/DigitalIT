const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const pool = require('../config/db');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user
      // review this later
      req.user = await pool.query(
        "SELECT user_id WHERE user_id = $1",
        decoded.id
      );
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized"); 
    }
  }
}