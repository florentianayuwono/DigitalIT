const express = require("express");
const router = express.Router();
const {
  getBusinessData,
  addBusinessData,
  updateBusinessName,
  updateCategories,
  updateProgress,
  deleteBusinessData,
} = require("../controllers/businessController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/business").get(protect, getBusinessData);
router.route("/business/add").post(protect, addBusinessData);
router
  .route("/:id")
  .put(protect, updateBusinessName)
  .put(protect, updateCategories)
  .put(protect, updateProgress)
  .delete(protect, deleteBusinessData);

module.exports = router;
