const asyncHandler = require("express-async-handler");
const pool = require("../config/db");

const addBusinessData = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { businessName, categories, hasDigitalized } = req.body;
    const newBusiness = await pool.query(
      "INSERT INTO business (manager_id, business_name, categories, has_digitalized) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.user.user_id, businessName, categories, hasDigitalized]
    );

    res.json(newBusiness.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

const getBusinessData = asyncHandler(async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT b.business_name, b.categories, b.has_digitalized FROM business AS b LEFT JOIN user_account AS u ON u.user_id = b.manager_id WHERE u.user_id = $1",
      [req.user.user_id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

const updateBusinessName = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { businessName } = req.body;
    const updateBusinessName = await pool.query(
      "UPDATE business SET business_name = $1 WHERE business_id = $2 AND manager_id = $3 RETURNING *",
      [businessName, id, req.user.user_id]
    );

    if (updateBusinessName.rows.length === 0) {
      return res.json("You have not declared a business yet.");
    }

    res.json("Business name was updated.");
  } catch (err) {
    console.error(err.message);
  }
});

const updateCategories = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { categories } = req.body;
    const updateCategories = await pool.query(
      "UPDATE business SET categories = $1 WHERE business_id = $2 AND user_id = $3 RETURNING *",
      [categories, id, req.user.user_id]
    );

    if (updateCategories.rows.length === 0) {
      return res.json("You have not declared a category yet.");
    }

    res.json("Category was updated.");
  } catch (err) {
    console.error(err.message);
  }
});

const updateProgress = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updateProgress = await pool.query(
      "UPDATE business SET has_digitalized = $1 WHERE business_id = $2 AND user_id = $3 RETURNING *",
      [status, id, req.user.user_id]
    );

    if (updateProgress.rows.length === 0) {
      return res.json("You have not declared a progress yet.");
    }

    res.json("Progress was updated.");
  } catch (err) {
    console.error(err.message);
  }
});

const deleteBusinessData = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBusiness = await pool.query(
      "DELETE FROM business WHERE business_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.user_id]
    );

    if (deleteBusiness.rows.length === 0) {
      return res.json("You do not have this business.");
    }

    res.json("Business data was deleted.");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = {
  addBusinessData,
  getBusinessData,
  updateBusinessName,
  updateCategories,
  updateProgress,
  deleteBusinessData,
};