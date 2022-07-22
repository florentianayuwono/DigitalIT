const express = require("express");
const router = express.Router();
const {
  addLocalProductData,
  getLocalProductData,
  updateLocalProductData,
  deleteLocalProductData,
  addProductData,
  getProductData,
  updateProductData,
  addProductSalesInput,
  productRelativePerformance,
} = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, addLocalProductData);
router.get("/", protect, getLocalProductData);

router.post("/sales", protect, addProductSalesInput);
router.get("/sales/compareglobal", protect, productRelativePerformance);

router
  .route("/:id")
  .get(protect, getLocalProductData)
  .put(protect, updateLocalProductData)
  .delete(protect, deleteLocalProductData);

// central route for main products
router.route("/main").post(protect, addProductData);
router
  .route("/main/:id&:keyword")
  .get(getProductData)
  .put(protect, updateProductData);

module.exports = router;
