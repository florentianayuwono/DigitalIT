const express = require("express");
const router = express.Router();
const {
  addProductData,
  getProductData,
  updateProductData,
  deleteProductData,
} = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getProductData).
router.route("/add").post(protect, addProductData);
router
  .route("/:id")
  .get(protect, getProductData)
  .put(protect, updateProductData)
  .delete(protect, deleteProductData);

module.exports = router;