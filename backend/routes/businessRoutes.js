const express = require("express");
const router = express.Router();
const {
  addBusinessData,
  getBusinessData,
  updateBusinessData,
  deleteBusinessData,
  businessSummary,
  bestCategoricalPlatform
} = require("../controllers/businessController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getBusinessData).post(protect, addBusinessData);
router.get("/summary", protect, businessSummary);
router.get("/bestplatform", bestCategoricalPlatform);

router
  .route("/:id")
  .get(protect, getBusinessData)
  .put(protect, updateBusinessData)
  .delete(protect, deleteBusinessData);

module.exports = router;
