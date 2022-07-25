const asyncHandler = require("express-async-handler");
const pool = require("../config/db");
const { getDate } = require("../auxiliaries/helperFunctions");
const {
  mostProfitableProduct,
  mostSoldProduct,
} = require("../auxiliaries/productRecommendationFunctions");
const {
  bestPlatform,
} = require("../auxiliaries/recommendationFunctions/businessRecommendationFunctions");

// @desc    Register new business
// @route   POST /api/business/
// @access  Private
const addBusinessData = asyncHandler(async (req, res) => {
  const { businessName, business_category, hasDigitalized } = req.body;
  const newBusiness = await pool.query(
    "INSERT INTO business (manager_id, business_name, business_category, has_digitalized, creation_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      req.user.user_id,
      businessName,
      business_category,
      hasDigitalized,
      getDate(),
    ]
  );

  res.status(201).json(newBusiness.rows[0]);
});

// @desc    Get business data
// @route   GET /api/business/:id
// @access  Private
const getBusinessData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // If there is id, then return specific business with that id
  if (id) {
    const specificBusiness = await pool.query(
      "SELECT b.business_id, b.business_name, b.business_category, b.has_digitalized FROM business AS b LEFT JOIN user_account AS u ON u.user_id = b.manager_id WHERE u.user_id = $1 AND b.business_id = $2",
      [req.user.user_id, id]
    );

    const result = specificBusiness.rows[0];
    res.status(result ? 200 : 404).json(
      result
        ? result
        : {
            message:
              "This user doesn't have this business or this business doesn't exist",
          }
    );

    // There is no id, therefore return all businesses that this user has
  } else {
    const business = await pool.query(
      "SELECT b.business_id, b.business_name, b.business_category, b.has_digitalized FROM business AS b LEFT JOIN user_account AS u ON u.user_id = b.manager_id WHERE u.user_id = $1",
      [req.user.user_id]
    );

    res.status(200).json(business.rows);
  }
});

// @desc    Update business data
// @route   PUT /api/business/:id
// @access  Private
const updateBusinessData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { businessName, business_category, progress } = req.body;

  // Update information based on the changes that the user made
  if (businessName) {
    await pool.query(
      "UPDATE business SET business_name = $1 WHERE business_id = $2 AND manager_id = $3 RETURNING *",
      [businessName, id, req.user.user_id]
    );
  }

  if (business_category) {
    await pool.query(
      "UPDATE business SET business_category = $1 WHERE business_id = $2 AND manager_id = $3 RETURNING *",
      [business_category, id, req.user.user_id]
    );
  }

  if (progress) {
    await pool.query(
      "UPDATE business SET has_digitalized = $1 WHERE business_id = $2 AND manager_id = $3 RETURNING *",
      [progress, id, req.user.user_id]
    );
  }

  res.status(200).json("Updated");
});

// @desc    Delete business data
// @route   DELETE /api/business/:id
// @access  Private
const deleteBusinessData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteBusiness = await pool.query(
    "DELETE FROM business WHERE business_id = $1 AND user_id = $2 RETURNING *",
    [id, req.user.user_id]
  );

  if (deleteBusiness.rows.length === 0) {
    return res.json("You do not have this business.");
  }

  res.status(200).json("Business data was deleted.");
});

/**
 * @desc Given a business_id and a period, the summary consists of the following:
 * - Total number of products sold
 * - Total number of products sold per category
 * - Total revenue
 * - Total revenue per category
 * - Total profit (revenue - cost)
 * - Total profit per category
 * - Product with the highest profit
 * - Product with the highest sales
 * - Store with the highest profit
 * @route GET /api/business/summary
 * @access Private
 */
const businessSummary = asyncHandler(async (req, res) => {
  const { business_id, date_range } = req.headers;

  const business = await pool.query(
    "SELECT * FROM business WHERE business_id = $1",
    [business_id]
  );

  if (business.rows[0]?.manager_id !== req.user.user_id) {
    return res.status(401).json("You do not have access to this business.");
  }

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

  // Join product_sales table and store table using the store_id column
  // Join product_sales table and product table using the product_id column
  const sales = await pool.query(
    `SELECT p.product_name, p.product_category, ps.product_cost, ps.product_price, ps.quantity,
    ps.input_date, ps.date_range, ps.individual_profit, ps.total_profit, s.store_name, s.store_id
    FROM 
    (product_sales AS ps LEFT JOIN store AS s ON s.store_id = ps.store_id LEFT JOIN product_main AS p ON p.product_id = ps.product_id) 
    WHERE s.business_id = $1 AND ps.date_range = $2`,
    [business_id, date_range]
  );

  const filteredSales = sales.rows.filter((sale) => {
    return new Date(sale.input_date) < dateMinusDateRange;
  });

  if (filteredSales.length === 0) {
    return res.status(404).json("No sales found.");
  }

  const totalNumberOfProductsSold = filteredSales.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  const totalNumberOfProductsSoldPerCategory = filteredSales.reduce(
    (acc, curr) => {
      if (acc[curr.product_category]) {
        acc[curr.product_category] += curr.quantity;
      } else {
        acc[curr.product_category] = curr.quantity;
      }
      return acc;
    },
    {}
  );

  const totalRevenue = filteredSales.reduce((acc, curr) => {
    return acc + curr.product_price * curr.quantity;
  }, 0);

  const totalRevenuePerCategory = filteredSales.reduce((acc, curr) => {
    if (acc[curr.product_category]) {
      acc[curr.product_category] += curr.product_price * curr.quantity;
    } else {
      acc[curr.product_category] = curr.product_price * curr.quantity;
    }
    return acc;
  }, {});

  const totalProfit = filteredSales.reduce((acc, curr) => {
    return acc + parseFloat(curr.total_profit);
  }, 0);

  const totalProfitPerCategory = filteredSales.reduce((acc, curr) => {
    if (acc[curr.product_category]) {
      acc[curr.product_category] += parseFloat(curr.total_profit);
    } else {
      acc[curr.product_category] = parseFloat(curr.total_profit);
    }
    return acc;
  }, {});

  const highestProfit = mostProfitableProduct(filteredSales);
  const highestSales = mostSoldProduct(filteredSales);
  const highestProfitStore = filteredSales.reduce((acc, curr) => {
    if (acc[curr.store]) {
      acc[curr.store] += parseFloat(curr.total_profit);
    } else {
      acc[curr.store] = parseFloat(curr.total_profit);
    }
    return acc;
  }, {});
  console.log(filteredSales);

  res.status(200).json({
    totalNumberOfProductsSold,
    totalNumberOfProductsSoldPerCategory,
    totalRevenue,
    totalRevenuePerCategory,
    totalProfit,
    totalProfitPerCategory,
    highestProfit,
    highestSales,
    highestProfitStore,
  });
});

/**
 * @desc    Given a category, find the platform with the highest profit
 * @route   GET /api/business/bestplatform
 * @access  Public
 */
const bestCategoricalPlatform = asyncHandler(async (req, res) => {
  const { category } = req.headers;

  // Get the sales data for the given category, join with platform table and product_main table
  const sales = await pool.query(
    `SELECT p.product_category, ps.quantity, ps.total_profit,
    pl.platform_name
    FROM
    (product_sales AS ps LEFT JOIN store AS s ON s.store_id = ps.store_id LEFT JOIN product_main AS p ON p.product_id = ps.product_id)
    LEFT JOIN platform AS pl ON pl.platform_id = s.store_platform_id
    WHERE p.product_category = $1`,
    [category]
  );

  const best = bestPlatform(sales.rows);

  res.status(200).json(best);
});

module.exports = {
  addBusinessData,
  getBusinessData,
  updateBusinessData,
  deleteBusinessData,
  businessSummary,
  bestCategoricalPlatform,
};
