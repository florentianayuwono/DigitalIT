const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);

// admin purposes. delete when deploying
router.delete("/", deleteUser);

module.exports = router;
