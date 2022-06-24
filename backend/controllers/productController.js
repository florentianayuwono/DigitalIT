const asyncHandler = require("express-async-handler");
const pool = require("../config/db");

const addProductData = asyncHandler(async (req, res) => {
  const { productName, productDescription, price, cost } = req.body;
  const newProduct = await pool.query(
    "INSERT INTO product (business_id, product_name, product_description, price, cost) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [req.business.business_id, productName, productDescription, price, cost]
  );

  res.json(newProduct.rows[0]);
});

const getProductData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (id) {
    const specificProduct = await pool.query(
      "SELECT p.product_name, p.product_description, p.price, p.cost FROM product AS p LEFT JOIN business AS b ON b.business_id = p.business_id WHERE b.business_id = $1 AND p.product_id = $2",
      [req.business.business_id, id]
    );

    res.json(specificProduct.rows);
  } else {
    const product = await pool.query(
      "SELECT p.product_name, p.product_description, p.price, p.cost FROM product AS p LEFT JOIN business AS b ON b.business_id = p.business_id WHERE b.business_id = $1",
      [req.business.business_id]
    );

    res.json(product.rows);
  }
});

const updateProductData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { productName, productDescription, price, cost } = req.body;

  // name
  if (productName) {
    console.log(productName);
    await pool.query(
      "UPDATE product SET product_name = $1 WHERE product_id = $2 AND business_id = $3 RETURNING *",
      [productName, id, req.business.business_id]
    );
  }

  // description
  if (productDescription) {
    console.log(productDescription);
    await pool.query(
      "UPDATE product SET product_description = $1 WHERE product_id = $2 AND business_id = $3 RETURNING *",
      [productDescription, id, req.business.business_id]
    );
  }

  // price
  if (price) {
    console.log(price);
    await pool.query(
      "UPDATE product SET price = $1 WHERE product_id = $2 AND business_id = $3 RETURNING *",
      [price, id, req.business.business_id]
    );
  }

  // cost
  if (cost) {
    console.log(cost);
    await pool.query(
      "UPDATE product SET cost = $1 WHERE product_id = $2 AND business_id = $3 RETURNING *",
      [cost, id, req.business.business_id]
    );
  }

  res.json("Updated");
});

const deleteProductData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await pool.query(
    "DELETE FROM product WHERE product_id = $1 AND business_id = $2 RETURNING *",
    [id, req.business.business_id]
  );

  if (deleteProduct.rows.length === 0) {
    return res.json("You do not have this product.");
  }

  res.json("Product data was deleted.");
});

module.exports = {
  addProductData,
  getProductData,
  updateProductData,
  deleteProductData,
};
