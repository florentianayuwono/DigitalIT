const asyncHandler = require("express-async-handler");
const pool = require("../config/db");
const getDate = require("../auxiliaries/helperFunctions").getDate;

// @desc    Add new store
// @route   POST /api/store/
// @access  Private
const addStoreData = asyncHandler(async (req, res) => {
  const { business_id, platform_id } = req.body;
  const business = await pool.query(
    "SELECT * from business WHERE business_id = $1",
    [business_id]
  );

  // Check whether the user who tries to add new store is indeed the business owner
  if (business.rows[0].manager_id !== req.user.user_id) {
    res.status(401);
    throw new Error("You do not own this business.");
  }

  const platform = await pool.query(
    `SELECT * from platform WHERE platform_id = $1`,
    [platform_id]
  );

  const newStore = await pool.query(
    "INSERT INTO store (store_name, business_id, store_manager_id, store_platform_id, creation_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      business.rows[0].business_name + ` - ${platform.rows[0].platform_name}`,
      business_id,
      business.rows[0].manager_id,
      platform_id,
      getDate(),
    ]
  );

  res
    .status(newStore.rows[0] ? 201 : 400)
    .json(
      newStore.rows[0] ? newStore.rows[0] : { message: "Failed to add store." }
    );
});

// @desc    Get store data
// @route   GET /api/store/:store_id
// @access  Private
const getStoreData = asyncHandler(async (req, res) => {
  const { store_id } = req.params;

  const { business_id } = req.headers;

  const manager_id = await pool.query(
    "SELECT * from business WHERE business_id = $1",
    [business_id]
  );
  // Check whether the user who tries to access store data is indeed the business owner
  if (manager_id.rows[0].manager_id !== req.user.user_id) {
    res.status(401);
    throw new Error("You do not own this store.");
  }

  // If there is id specified, return the specified store
  if (store_id) {
    const specificStore = await pool.query(
      "SELECT * FROM store AS s LEFT JOIN business AS b ON b.business_id = s.business_id WHERE b.business_id = $1 AND s.store_id = $2",
      [business_id, store_id]
    );
    res
      .status(specificStore.rows[0] ? 200 : 400)
      .json(specificStore.rows[0] || { message: "Store not found." });
    // Since there is no id specified, return all the stores that this business has
  } else {
    const store = await pool.query(
      "SELECT * FROM store AS s LEFT JOIN business AS b ON b.business_id = s.business_id WHERE b.business_id = $1",
      [business_id]
    );

    res
      .status(store.rows ? 200 : 400)
      .json(store.rows || { message: "No stores found." });
  }
});

// @desc    Delete store data
// @route   DELETE /api/store/:id
// @access  Private
const deleteStoreData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { business_id } = req.body;

  const manager_id = await pool.query(
    "SELECT manager_id from business WHERE business_id = $1",
    [business_id]
  );
  // Check whether the user who tries to delete store data is indeed the business owner
  if (manager_id.rows[0].manager_id !== req.user.user_id) {
    res.status(401);
    throw new Error("You do not own this store.");
  }

  const deleteStore = await pool.query(
    "DELETE FROM store WHERE store_id = $1 AND business_id = $2 RETURNING *",
    [id, business_id]
  );

  if (deleteStore.rows.length === 0) {
    return res.status(401).json("You do not have this store.");
  }

  res.status(200).json("Store data was deleted.");
});

module.exports = {
  addStoreData,
  getStoreData,
  deleteStoreData,
};
