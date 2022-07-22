const { getDate } = require("../auxiliaries/helperFunctions");
const asyncHandler = require("express-async-handler");
const pool = require("../config/db");
const {
  deltaProductSales,
  deltaProductSalesMessage,
  productProfitScore,
  productRelativeSalesScore,
  productRelativePerformanceMessage,
} = require("../auxiliaries/productRecommendationFunctions");

// @desc    Add a new local product
// @route   POST /api/product/
// @access  Private
const addLocalProductData = asyncHandler(async (req, res) => {
  const { store_id, product_id, product_cost, product_price } = req.body;

  const store = await pool.query("SELECT * FROM store WHERE store_id = $1", [
    store_id,
  ]);

  const { business_id, store_manager_id } = store.rows[0];

  if (store_manager_id === req.user.user_id) {
    const newProduct = await pool.query(
      "INSERT INTO product_secondary (store_id, business_id, product_id, product_cost, product_price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [store_id, business_id, product_id, product_cost, product_price]
    );

    res
      .status(newProduct.rows[0] ? 201 : 400)
      .json(newProduct.rows[0] || { message: "Failed to add product." });
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

  res
    .status(resultQuery ? 201 : 401)
    .json(resultQuery ? resultQuery : { message: "failed to add" });
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

/**
 * @desc    Get product data
 * @route   GET /api/product/:id
 * @access  Private
 */
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
      
      SELECT p.product_id, p.product_local_id, pm.product_name, pm.product_description, p.product_cost, p.product_price
      FROM 
        (SELECT * FROM product_secondary WHERE product_local_id = $1) as p,
        (SELECT * FROM product_main WHERE product_id = (SELECT product_id FROM ps)) as pm`,
      [id]
    );

    res
      .status(resultQuery.rows[0] ? 200 : 401)
      .json(resultQuery.rows[0] || { message: "Not found" });
  } else if (store_id) {
    const store = await pool.query("SELECT * FROM store WHERE store_id = $1", [
      store_id,
    ]);

    if (store.rows[0].store_manager_id !== req.user.user_id) {
      res
        .status(401)
        .json({ message: "You are not authorized to view this product" });
    }

    const resultQuery = await pool.query(
      `
      SELECT p.product_id, p.product_local_id, p.store_id, pm.product_name, pm.product_description, p.product_cost, p.product_price 
      FROM 
      product_secondary AS p LEFT JOIN product_main as pm ON p.product_id = pm.product_id WHERE p.store_id = $1
      `,
      [store_id]
    );

    res
      .status(resultQuery.rows ? 200 : 401)
      .json(resultQuery.rows || { message: "Not found" });
  } else if (business_id) {
    const business = await pool.query(
      "SELECT * FROM business WHERE business_id = $1",
      [business_id]
    );

    if (business.rows[0].manager_id !== req.user.user_id) {
      res
        .status(401)
        .json({ message: "You are not authorized to view this product" });
    }

    const resultQuery = await pool.query(
      `
      SELECT p.product_id, p.product_local_id, p.store_id, pm.product_name, pm.product_description, p.product_cost, p.product_price 
      FROM 
      product_secondary AS p LEFT JOIN product_main as pm ON p.product_id = pm.product_id WHERE p.business_id = $1
      `,
      [business_id]
    );

    res
      .status(resultQuery.rows ? 200 : 401)
      .json(resultQuery.rows || { message: "Not found" });
  } else {
    res.status(400).json({ message: "Improper input" });
  }
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
  // ID is local product ID
  const { id: product_id } = req.params;

  const manager = await pool.query(
    `SELECT * FROM business 
    WHERE business_id = (SELECT business_id FROM product_secondary WHERE product_local_id = $1)`,
    [product_id]
  );
  console.log(req.params);

  // Check whether the user who tries to delete product data is indeed the business owner
  if (manager.rows[0].manager_id !== req.user.user_id) {
    res.status(401);
    throw new Error("You do not own this product.");
  }

  const deleted = await pool.query(
    `DELETE FROM product_secondary WHERE product_local_id = $1 RETURNING *`,
    [product_id]
  );

  res
    .status(deleted.rows[0] ? 200 : 401)
    .json(
      deleted.rows[0]
        ? { ...deleted.rows[0], success: true }
        : { message: "Failed to delete" }
    );
});

/**
 * @desc    Delete all products in the specified store
 * @route   No Route. This is an internal function.
 * @access  Private
 */
const deleteAllStoreProducts = asyncHandler(async (store_id, user_id) => {
  const deleted = await pool.query(
    `DELETE FROM product_secondary WHERE store_id = $1 RETURNING *`,
    [store_id]
  );

  return deleted.rows;
});

/**
 * @desc   Add a product sales input to the product_sales table.
 * @route  POST /api/product/sales
 * @access Private
 */
const addProductSalesInput = asyncHandler(async (req, res) => {
  const { product_local_id, date_range, number_of_sales } = req.body;

  const product = await pool.query(
    `SELECT * FROM product_secondary WHERE product_local_id = $1`,
    [product_local_id]
  );

  let { product_id, store_id, product_cost, product_price } = product.rows[0];
  product_cost = parseFloat(product_cost);
  product_price = parseFloat(product_price);

  const store = await pool.query(`SELECT * FROM store WHERE store_id = $1`, [
    store_id,
  ]);

  if (store?.rows[0].store_manager_id !== req.user.user_id) {
    res.status(401);
    throw new Error("You do not own this product.");
  }

  // date_range: 0 = daily, 1 = weekly, 2 = monthly, 3 = yearly
  // Check if the date_range overlaps with another period in last input date
  const existingData = await pool.query(
    `SELECT * FROM product_sales WHERE product_id = $1 AND date_range = $2 AND store_id = $3`,
    [product_id, date_range, store_id]
  );

  // Receives a date_range and then return the time in miliseconds
  const dateRangeParser = (date_range) => {
    switch (date_range) {
      case 0:
        return 86400000;
      case 1:
        return 604800000;
      case 2:
        return 2592000000;
      case 3:
        return 31536000000;
      default:
        return 86400000;
    }
  };

  const dateMinusDateRange = new Date(
    new Date(getDate()) - dateRangeParser(date_range)
  );

  if (existingData.rows.length > 0) {
    // Select from existingdata.rows where the input_date is maximum
    const maxInputDate = existingData.rows.reduce((prev, curr) => {
      return new Date(prev.input_date) > new Date(curr.input_date)
        ? prev
        : curr;
    })?.input_date;

    if (maxInputDate && new Date(maxInputDate) > dateMinusDateRange) {
      res.status(400);
      throw new Error("You have already inputted this data in this period.");
    }
  }

  const addInput = await pool.query(
    `INSERT INTO product_sales
    (product_id, product_local_id, store_id, input_date, date_range, quantity, product_cost, product_price, individual_profit, total_profit)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    [
      product_id,
      product_local_id,
      store_id,
      getDate(),
      date_range,
      number_of_sales,
      product_cost,
      product_price,
      product_price - product_cost,
      (product_price - product_cost) * number_of_sales,
    ]
  );

  res.status(addInput.rows[0] ? 201 : 401).json(addInput.rows[0] || {});
});

/**
 * @desc Compare the product sales input with the product_sales table.
 * @route POST /api/product/sales/compareglobal
 */
const productRelativePerformance = asyncHandler(async (req, res) => {
  const { product_local_id, date_range } = req.body;

  const product = await pool.query(
    `SELECT * FROM product_secondary WHERE product_local_id = $1`,
    [product_local_id]
  );

  let { product_id, store_id, product_cost, product_price } = product.rows[0];
  product_cost = parseFloat(product_cost);
  product_price = parseFloat(product_price);

  const store = await pool.query(`SELECT * FROM store WHERE store_id = $1`, [
    store_id,
  ]);

  if (store?.rows[0].store_manager_id !== req.user.user_id) {
    res.status(401);
    throw new Error("You do not own this product.");
  }

  // date_range: 0 = daily, 1 = weekly, 2 = monthly, 3 = yearly
  const dateRangeParser = (date_range) => {
    switch (date_range) {
      case 0:
        return 86400000;
      case 1:
        return 604800000;
      case 2:
        return 2592000000;
      case 3:
        return 31536000000;
      default:
        return 86400000;
    }
  };

  const dateMinusDateRange = new Date(
    new Date(getDate()) - dateRangeParser(date_range)
  );

  const productSales = await pool.query(
    `SELECT * FROM product_sales WHERE product_id = $1 AND date_range = $2`,
    [product_id, date_range]
  );

  // Filter product sales that is before the dateMinusDateRange
  const filteredProductSales = productSales.rows.filter(
    (productSales) => new Date(productSales.input_date) > dateMinusDateRange
  );

  const thisProductSales = await pool.query(
    `SELECT * FROM product_sales WHERE product_local_id = $1 AND date_range = $2`,
    [product_local_id, date_range]
  );

  const quantitySoldArray = filteredProductSales.map((productSales) => {
    return productSales.quantity;
  });

  // If there is only one or less data, response 401 with error message
  if (quantitySoldArray.length <= 1) {
    res.status(401).json({filteredProductSales});
    throw new Error("There is not enough data to calculate the performance.");
  }

  const relativeScore = productRelativeSalesScore(
    quantitySoldArray,
    thisProductSales.rows[0].quantity
  );
  const { zScore, quantileRank } = relativeScore;
  const message = productRelativePerformanceMessage(
    zScore,
    quantileRank,
    quantitySoldArray.length
  );

  res.status(200).json({
    zScore,
    quantileRank,
    message,
  });
});

module.exports = {
  addProductData,
  getProductData,
  updateProductData,
  addLocalProductData,
  getLocalProductData,
  updateLocalProductData,
  deleteLocalProductData,
  deleteAllStoreProducts,
  addProductSalesInput,
  productRelativePerformance,
};
