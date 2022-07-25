const asyncHandler = require("express-async-handler");
const pool = require("../config/db");
const { deleteAllStoreProducts } = require("./productController");
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

  // Set the has_digitalized field to true for the business
  await pool.query(
    "UPDATE business SET has_digitalized = true WHERE business_id = $1",
    [business_id]
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
  let { business_id } = req.headers;

  const manager = await pool.query(
    business_id
      ? `SELECT * from business WHERE business_id = $1`
      : `SELECT * from store WHERE store_id = $1`,
    [business_id || parseInt(store_id)]
  );
  
  const manager_id = business_id ? manager.rows[0].manager_id : manager.rows[0].store_manager_id;
  business_id = business_id || manager.rows[0].business_id;

  // Check whether the user who tries to access store data is indeed the business owner
  if (manager_id !== req.user.user_id) {
    res.status(401);
    throw new Error("You do not own this store.");
  }

  // If there is id specified, return the specified store
  if (store_id) {
    
    const specificStore = await pool.query(
      "SELECT * FROM store AS s LEFT JOIN business AS b ON b.business_id = s.business_id WHERE b.business_id = $1 AND s.store_id = $2",
      [business_id, parseInt(store_id)]
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
  const { store_id } = req.params;
  const store = await pool.query(`SELECT * from store WHERE store_id = $1`, [
    store_id,
  ]);

  // Check whether the user who tries to delete store data is indeed the business owner
  if (store.rows[0].store_manager_id !== req.user.user_id) {
    res.status(401);
    throw new Error("You do not own this store.");
  }

  const deleteProducts = await deleteAllStoreProducts(store_id);
  const deleteStore = await pool.query(
    `DELETE FROM store WHERE store_id = $1 RETURNING *`,
    [store_id]
  );

  // If there is no longer a store in the business, set the has_digitalized field to false
  const stores = await pool.query(
    `SELECT * FROM store WHERE business_id = $1`,
    [store.rows[0].business_id]
  );

  if (stores.rows.length === 0) {
    await pool.query(
      "UPDATE business SET has_digitalized = false WHERE business_id = $1",
      [store.rows[0].business_id]
    );
  }

  res
    .status(deleteStore.rows[0] ? 200 : 400)
    .json(
      deleteStore.rows[0]
        ? {
            ...deleteStore.rows[0],
            message: "Store deleted.",
            deletedProducts: deleteProducts,
          }
        : { message: "Failed to delete store." }
    );
});

module.exports = {
  addStoreData,
  getStoreData,
  deleteStoreData,
};
