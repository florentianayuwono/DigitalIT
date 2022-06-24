const asyncHandler = require("express-async-handler");
const pool = require("../config/db");

const addStoreData = asyncHandler(async (req, res) => {
  const { storeName } = req.body;
  const newStore = await pool.query(
    "INSERT INTO store (business_id, platform) VALUES ($1, $2) RETURNING *",
    [req.business.business_id, storeName]
  );

  res.json(newStore.rows[0]);
});

const getStoreData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (id) {
    const specificStore = await pool.query(
      "SELECT s.platform FROM store AS s LEFT JOIN business AS b ON b.business_id = s.business_id WHERE b.business_id = $1 AND s.store_id = $2",
      [req.business.business_id, id]
    );

    res.json(specificStore.rows);
  } else {
    const store = await pool.query(
      "SELECT s.platform FROM store AS s LEFT JOIN business AS b ON b.business_id = s.business_id WHERE b.business_id = $1",
      [req.business.business_id]
    );

    res.json(store.rows);
  }
});

const deleteStoreData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteStore = await pool.query(
    "DELETE FROM store WHERE store_id = $1 AND business_id = $2 RETURNING *",
    [id, req.business.business_id]
  );

  if (deleteStore.rows.length === 0) {
    return res.json("You do not have this store.");
  }

  res.json("Store data was deleted.");
});

module.exports = {
  addStoreData,
  getStoreData,
  deleteStoreData,
};
