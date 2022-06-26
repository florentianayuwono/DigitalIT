const asyncHandler = require("express-async-handler");
const pool = require("../config/db");

const addBusinessData = asyncHandler(async (req, res) => {
  const { businessName, category, hasDigitalized } = req.body;
  const newBusiness = await pool.query(
    "INSERT INTO business (manager_id, business_name, categories, has_digitalized) VALUES ($1, $2, $3, $4) RETURNING *",
    [req.user.user_id, businessName, category, hasDigitalized]
  );

  res.status(201).json(newBusiness.rows[0]);
});

const getBusinessData = asyncHandler(async (req, res) => {
  const business = await pool.query(
    "SELECT b.business_id, b.business_name, b.categories, b.has_digitalized FROM business AS b LEFT JOIN user_account AS u ON u.user_id = b.manager_id WHERE u.user_id = $1",
    [req.user.user_id]
  );

  res.status(200).json(business.rows);
});

const updateBusinessData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { businessName, category, progress } = req.body;

  if (businessName) {
    await pool.query(
      "UPDATE business SET business_name = $1 WHERE business_id = $2 AND manager_id = $3 RETURNING *",
      [businessName, id, req.user.user_id]
    );
  }

  if (category) {
    await pool.query(
      "UPDATE business SET categories = $1 WHERE business_id = $2 AND manager_id = $3 RETURNING *",
      [category, id, req.user.user_id]
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
