const asyncHandler = require("express-async-handler");
const pool = require("../config/db");

// @desc    Add a new local product
// @route   POST /api/product/
// @access  Private
const addLocalProductData = asyncHandler(async (req, res) => {
  const { store_id, product_id, product_cost, product_price } =
    req.body;

  const store = await pool.query(
    "SELECT * FROM store WHERE store_id = $1",
    [store_id]
  );

  const { business_id, store_manager_id } = store.rows[0];

  if (store_manager_id === req.user.user_id) {
    const newProduct = await pool.query(
      "INSERT INTO product_secondary (store_id, business_id, product_id, product_cost, product_price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [store_id, business_id, product_id, product_cost, product_price]
    );

    res.status(newProduct.rows[0] ? 201 : 400).json(newProduct.rows[0] || {message: "Failed to add product."});
  } else {
    res
      .status(401)
      .json({ message: "You are not authorized to add this product" });
  }
});

// @desc    Add new main product
// @route   POST /api/product/main/
// @access  Private
const addProductData = asyncHandler(async (req, res) => {
  const {
    product_name,
    product_description,
    product_category,
    product_importance,
    age_target,
    gender_target,
  } = req.body;

  const newProduct = await pool.query(
    "INSERT INTO product_main (product_name, product_description, product_category, product_importance, age_target, gender_target) VALUES ($1, $2, $3, 0, $4, $5) RETURNING *",
    [
      product_name,
      product_description,
      product_category,
      age_target,
      gender_target,
    ]
  );
  
  const resultQuery = newProduct.rows[0];

  res.status(resultQuery ? 201 : 401).json(resultQuery ? resultQuery : {message: "failed to add"});
});

/**
 * @desc    Get a main product data
 * @route   GET /api/product/main/:id&:keyword
 * @access  PUBLIC
 */
const getProductData = asyncHandler(async (req, res) => {
  const { id, keyword } = req.params;
  let resultQuery;

  if (id && id !== "all") {
    resultQuery = await pool.query(
      "SELECT * FROM product_main WHERE product_id = $1",
      [id]
    );

    result = resultQuery.rows[0];

    res
      .status(result ? 200 : 401)
      .json(result ? result : { message: "Not found" });
  } else {
    // MODIFY THIS LATER TO LIMIT SEARCH SIZE.
    // OR MODIFY TO SEARCH FOR ANY SUBSTRING EFFICIENTLY.
    resultQuery = await pool.query(
      "SELECT * FROM product_main WHERE product_name ILIKE $1",
      [`%${keyword === "none" ? "" : keyword}%`]
      );

    res.status(200).json(resultQuery.rows);
  }
});

/**
 * @desc    Update a main product data
 * @route   PUT /api/product/main/:id
 * @access  Private
 */
const updateProductData = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Not implemented yet" });
});

// @desc    Get product data
// @route   GET /api/product/:id
// @access  Private
const getLocalProductData = asyncHandler(async (req, res) => {
  // id is the local product ID
  const { id } = req.params;
  /*
  The next line is edited from req.body to req.headers because it seems that
  using the body for HTTP GET Requests is not a recommended practice and is not
  supported by the libraries used in frontend.
  
  This change might also have to be applied to other controllers as well.
  */
  const store_id = req.headers.store_id;
  const business_id = req.headers.business_id;

  if (id) {
    const manager = await pool.query(
      `SELECT manager_id FROM business WHERE business_id = 
        (SELECT business_id FROM product_secondary WHERE product_local_id = $1)`,
      [id]
      );
      
    // Check whether the user who tries to access product data is indeed the business owner
    if (manager.rows[0].manager_id !== req.user.user_id) {
      res
        .status(401)
        .json({ message: "You are not authorized to view this product" });
    }

    const resultQuery = await pool.query(
      `
      WITH ps AS (SELECT * FROM product_secondary WHERE product_local_id = $1)
      
      SELECT p.product_id, pm.product_name, pm.product_description, p.product_cost, p.product_price
      FROM 
        (SELECT * FROM product_secondary WHERE product_local_id = $1) as p,
        (SELECT * FROM product_main WHERE product_id = (SELECT product_id FROM ps)) as pm`,
      [id]
    );
    
    res.status(resultQuery.rows[0] ? 200 : 401).json(resultQuery.rows[0] || {message: "Not found"});
    
  } else if (store_id) {
    const store = await pool.query(
      "SELECT * FROM store WHERE store_id = $1",
      [store_id]
    )

  } else if (business_id) {

  } else {

  }

  // if (store.rows[0].store_manager_id !== req.user.user_id) {
  //   res.status(401);
  //   throw new Error("You do not own this product.");
  // }
  // // If there is id specified, return the specified product
  // if (id) {
  //   const specificProduct = await pool.query(
  //     "SELECT p.product_id, pm.product_name, pm.product_description, p.product_cost, p.product_price FROM product_secondary AS p LEFT JOIN product_main as pm ON p.product_id = pm.product_id WHERE p.store_id = $1 AND p.product_id = $2",
  //     [store_id, id]
  //   );

  //   res.status(200).json(specificProduct.rows[0]);
  //   // Since there is no id specified, return all the products that this business has
  // } else {
  //   const product = await pool.query(
  //     // "SELECT * FROM product_secondary WHERE business_id = $1",
  //     "SELECT p.product_id, pm.product_name, pm.product_description, p.product_cost, p.product_price FROM product_secondary AS p LEFT JOIN product_main as pm ON p.product_id = pm.product_id WHERE p.store_id = $1",
  //     [store_id]
  //   );

  //   res.status(200).json(product.rows);
  // }
});

// @desc    Update product data
// @route   PUT /api/product/:id
// @access  Private
const updateLocalProductData = asyncHandler(async (req, res) => {
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
const deleteLocalProductData = asyncHandler(async (req, res) => {
  const { id: product_id } = req.params;
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
    [product_id, business_id]
  );

  if (deleteProduct.rows.length === 0) {
    return res.json("You do not have this product.");
  }

  res.status(200).json({ success: true, product_id: product_id });
});

module.exports = {
  addProductData,
  getProductData,
  updateProductData,
  addLocalProductData,
  getLocalProductData,
  updateLocalProductData,
  deleteLocalProductData,
};
