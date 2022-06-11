const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const pool = require('../config/db');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
     
      // Get user 
      const user = await pool.query(
        "SELECT * FROM user_account WHERE user_id = $1",
        [decoded.id]
      );
        
      req.user = user.rows[0];
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized. Token is invalid."); 
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Authorization denied. There is no token.');
  }

});

module.exports = { protect };