const asyncHandler = require("express-async-handler");
const pool = require("../config/db");

// @desc    Add new store
// @route   POST /api/store/
// @access  Private
const addStoreData = asyncHandler(async (req, res) => {
  const { storeName, business_id } = req.body;
  const manager_id = await pool.query(
    "SELECT manager_id from business WHERE business_id = $1",
    [business_id]
  );
  // Check whether the user who tries to add new store is indeed the business owner
  if (manager_id.rows[0].manager_id !== req.user.user_id) {
    res.status(401);
    throw new Error("You do not own this store.");
  }

  const newStore = await pool.query(
    "INSERT INTO store (business_id, platform) VALUES ($1, $2) RETURNING *",
    [business_id, storeName]
  );

  res.status(201).json(newStore.rows[0]);
});

// @desc    Get store data
// @route   GET /api/store/:id
// @access  Private
const getStoreData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { business_id } = req.body;

  const manager_id = await pool.query(
    "SELECT manager_id from business WHERE business_id = $1",
    [business_id]
  );
  // Check whether the user who tries to access store data is indeed the business owner
  if (manager_id.rows[0].manager_id !== req.user.user_id) {
    res.status(401);
    throw new Error("You do not own this store.");
  }
  // If there is id specified, return the specified store
  if (id) {
    const specificStore = await pool.query(
      "SELECT s.platform FROM store AS s LEFT JOIN business AS b ON b.business_id = s.business_id WHERE b.business_id = $1 AND s.store_id = $2",
      [business_id, id]
    );
    res.status(200).json(specificStore.rows[0]);
    // Since there is no id specified, return all the stores that this business has
  } else {
    const store = await pool.query(
      "SELECT s.platform FROM store AS s LEFT JOIN business AS b ON b.business_id = s.business_id WHERE b.business_id = $1",
      [business_id]
    );

    res.status(200).json(store.rows);
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
