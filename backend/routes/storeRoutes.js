const express = require("express");
const router = express.Router();
const {
  addStoreData,
  getStoreData,
  deleteStoreData,
} = require("../controllers/storeController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getStoreData);
router.post("/", protect, addStoreData);
router
  .route("/:store_id")
  .get(protect, getStoreData)
  .delete(protect, deleteStoreData);

module.exports = router;
