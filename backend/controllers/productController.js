const asyncHandler = require("express-async-handler");
const pool = require("../config/db");

// @desc    Add new product
// @route   POST /api/product/
// @access  Private
const addProductData = asyncHandler(async (req, res) => {
  const { productName, productDescription, price, cost, business_id } =
    req.body;
  const manager_id = await pool.query(
    "SELECT manager_id from business WHERE business_id = $1",
    [business_id]
  );

  // Check whether the user who tries to add new product is indeed the business owner
  if (manager_id.rows[0].manager_id === req.user.user_id) {
    const newProduct = await pool.query(
      "INSERT INTO product (business_id, product_name, product_description, price, cost) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [business_id, productName, productDescription, price, cost]
    );

    res.status(201).json(newProduct.rows[0]);
  } else {
    res.status(401);
    throw new Error("You do not own this product.");
  }
});

// @desc    Get product data
// @route   GET /api/product/:id
// @access  Private
const getProductData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  /*
  The next line is edited from req.body to req.headers because it seems that
  using the body for HTTP GET Requests is not a recommended practice and is not
  supported by the libraries used in frontend.
  
  This change might also have to be applied to other controllers as well.
  */
  const business_id = req.headers.business_id;
  const manager_id = await pool.query(
    "SELECT manager_id from business WHERE business_id = $1",
    [business_id]
  );
  // Check whether the user who tries to access product data is indeed the business owner
  if (manager_id.rows[0].manager_id !== req.user.user_id) {
    res.status(401);
    throw new Error("You do not own this product.");
  }
  // If there is id specified, return the specified product
  if (id) {
    const specificProduct = await pool.query(
      "SELECT p.product_id, p.product_name, p.product_description, p.price, p.cost FROM product AS p LEFT JOIN business AS b ON b.business_id = p.business_id WHERE b.business_id = $1 AND p.product_id = $2",
      [business_id, id]
    );

    res.status(200).json(specificProduct.rows[0]);
    // Since there is no id specified, return all the products that this business has
  } else {
    const product = await pool.query(
      "SELECT p.product_id, p.product_name, p.product_description, p.price, p.cost FROM product AS p LEFT JOIN business AS b ON b.business_id = p.business_id WHERE b.business_id = $1",
      [business_id]
    );

    res.status(200).json(product.rows);
  }
});

// @desc    Update product data
// @route   PUT /api/product/:id
// @access  Private
const updateProductData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { productName, productDescription, price, cost, business_id } =
    req.body;
  const manager_id = await pool.query(
    "SELECT manager_id from business WHERE business_id = $1",
    [business_id]
  );
  // Check whether the user who tries to update product data is indeed the business owner
  if (manager_id.rows[0].manager_id !== req.user.user_id) {
    res.status(401);
    throw new Error("You do not own this product.");
  }
  // Update product data based on the changes made
  if (productName) {
    await pool.query(
      "UPDATE product SET product_name = $1 WHERE product_id = $2 AND business_id = $3 RETURNING *",
      [productName, id, business_id]
    );
  }

  if (productDescription) {
    await pool.query(
      "UPDATE product SET product_description = $1 WHERE product_id = $2 AND business_id = $3 RETURNING *",
      [productDescription, id, business_id]
    );
  }

  if (price) {
    await pool.query(
      "UPDATE product SET price = $1 WHERE product_id = $2 AND business_id = $3 RETURNING *",
      [price, id, business_id]
    );
  }

  if (cost) {
    await pool.query(
      "UPDATE product SET cost = $1 WHERE product_id = $2 AND business_id = $3 RETURNING *",
      [cost, id, business_id]
    );
  }

  res.status(200).json("Updated");
});

// @desc    Delete product data
// @route   DELETE /api/product/:id
// @access  Private
const deleteProductData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { business_id } = req.body;

  const manager_id = await pool.query(
    "SELECT manager_id from business WHERE business_id = $1",
    [business_id]
  );
  // Check whether the user who tries to delete product data is indeed the business owner
  if (manager_id.rows[0].manager_id !== req.user.user_id) {
    res.status(401);
    throw new Error("You do not own this product.");
  }

  const deleteProduct = await pool.query(
    "DELETE FROM product WHERE product_id = $1 AND business_id = $2 RETURNING *",
    [id, business_id]
  );

  if (deleteProduct.rows.length === 0) {
    return res.json("You do not have this product.");
  }

  res.status(200).json("Product data was deleted.");
});

module.exports = {
  addProductData,
  getProductData,
  updateProductData,
  deleteProductData,
};
