const express = require("express");
const router = express.Router();
const {
  addBusinessData,
  getBusinessData,
  updateBusinessData,
  deleteBusinessData,
} = require("../controllers/businessController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getBusinessData).post(protect, addBusinessData);
router
  .route("/:id")
  .put(protect, updateBusinessData)
  .delete(protect, deleteBusinessData);

module.exports = router;
