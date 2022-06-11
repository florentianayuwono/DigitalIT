const express = require("express");
const router = express.Router();
const {
  getBusinessData,
  updateBusinessData
} = require("../controllers/businessController");

router.route('/business').get(protect, getBusinessData);
router.route('/:id').put(protect, updateBusinessData);

module.exports = router;
