const asyncHandler = require("express-async-handler");
const pool = require("../config/db");

const addBusinessData = asyncHandler(async (req, res) => {
  const { businessName, categories, hasDigitalized } = req.body;
  const newBusiness = await pool.query(
    "INSERT INTO business (manager_id, business_name, categories, has_digitalized) VALUES ($1, $2, $3, $4) RETURNING *",
    [req.user.user_id, businessName, categories, hasDigitalized]
  );

  res.json(newBusiness.rows[0]);
});

const getBusinessData = asyncHandler(async (req, res) => {
  const user = await pool.query(
    "SELECT b.business_id, b.business_name, b.categories, b.has_digitalized FROM business AS b LEFT JOIN user_account AS u ON u.user_id = b.manager_id WHERE u.user_id = $1",
    [req.user.user_id]
  );

  res.json(user.rows);
});

const updateBusinessData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { businessName, category, progress } = req.body;

  // name
  if (businessName) {
    console.log(businessName);
    await pool.query(
      "UPDATE business SET business_name = $1 WHERE business_id = $2 AND manager_id = $3 RETURNING *",
      [businessName, id, req.user.user_id]
    );
  }

  // category
  if (category) {
    console.log(category);
    await pool.query(
      "UPDATE business SET categories = $1 WHERE business_id = $2 AND manager_id = $3 RETURNING *",
      [category, id, req.user.user_id]
    );
  }

  // progress
  if (progress) {
    console.log(progress);
    await pool.query(
      "UPDATE business SET has_digitalized = $1 WHERE business_id = $2 AND manager_id = $3 RETURNING *",
      [progress, id, req.user.user_id]
    );
  }

  res.json("Updated");
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

  res.json("Business data was deleted.");
});

module.exports = {
  addBusinessData,
  getBusinessData,
  updateBusinessData,
  deleteBusinessData,
};
