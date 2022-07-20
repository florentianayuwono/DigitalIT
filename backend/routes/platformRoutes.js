const express = require("express");
const router = express.Router();
const { admin } = require("../middlewares/authAdminMiddleware");
const { addPlatform, getPlatform } = require("../controllers/platformController");

router.post("/", admin, addPlatform);
router.get("/", admin, getPlatform);
router.get("/:platform_id", admin, getPlatform);

module.exports = router;