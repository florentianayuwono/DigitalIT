const asyncHandler = require("express-async-handler");
const pool = require("../config/db");
const { getDate } = require("../auxiliaries/helperFunctions");

// @desc    Register new business
// @route   POST /api/business/
// @access  Private
const addBusinessData = asyncHandler(async (req, res) => {
  const { businessName, business_category, hasDigitalized } = req.body;
  const newBusiness = await pool.query(
    "INSERT INTO business (manager_id, business_name, business_category, has_digitalized, creation_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [req.user.user_id, businessName, business_category, hasDigitalized, getDate()]
  );

  res.status(201).json(newBusiness.rows[0]);
});

// @desc    Get business data
// @route   GET /api/business/:id
// @access  Private
const getBusinessData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // If there is id, then return specific business with that id
  if (id) {
    const specificBusiness = await pool.query(
      "SELECT b.business_id, b.business_name, b.business_category, b.has_digitalized FROM business AS b LEFT JOIN user_account AS u ON u.user_id = b.manager_id WHERE u.user_id = $1 AND b.business_id = $2",
      [req.user.user_id, id]
    );

    const result = specificBusiness.rows[0];
    res.status(result ? 200 : 404).json(
      result
        ? result
        : {
            message:
              "This user doesn't have this business or this business doesn't exist",
          }
    );

    // There is no id, therefore return all businesses that this user has
  } else {
    const business = await pool.query(
      "SELECT b.business_id, b.business_name, b.business_category, b.has_digitalized FROM business AS b LEFT JOIN user_account AS u ON u.user_id = b.manager_id WHERE u.user_id = $1",
      [req.user.user_id]
    );

    res.status(200).json(business.rows);
  }
});

// @desc    Update business data
// @route   PUT /api/business/:id
// @access  Private
const updateBusinessData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { businessName, business_category, progress } = req.body;

  // Update information based on the changes that the user made
  if (businessName) {
    await pool.query(
      "UPDATE business SET business_name = $1 WHERE business_id = $2 AND manager_id = $3 RETURNING *",
      [businessName, id, req.user.user_id]
    );
  }

  if (business_category) {
    await pool.query(
      "UPDATE business SET business_category = $1 WHERE business_id = $2 AND manager_id = $3 RETURNING *",
      [business_category, id, req.user.user_id]
    );
  }

  if (progress) {
    await pool.query(
      "UPDATE business SET has_digitalized = $1 WHERE business_id = $2 AND manager_id = $3 RETURNING *",
      [progress, id, req.user.user_id]
    );
  }

  res.status(200).json("Updated");
});

// @desc    Delete business data
// @route   DELETE /api/business/:id
// @access  Private
const deleteBusinessData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteBusiness = await pool.query(
    "DELETE FROM business WHERE business_id = $1 AND user_id = $2 RETURNING *",
    [id, req.user.user_id]
  );

  if (deleteBusiness.rows.length === 0) {
    return res.json("You do not have this business.");
  }

  res.status(200).json("Business data was deleted.");
});

module.exports = {
  addBusinessData,
  getBusinessData,
  updateBusinessData,
  deleteBusinessData,
};
