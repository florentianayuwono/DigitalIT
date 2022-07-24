const ss = require("simple-statistics");

/**
 * Measure the difference of products sold of a certain product.
 * Returns either positive number ~ positive performance, or the converse.
 * @param {int} lastPeriodProductSales
 * @param {int} thisPeriodProductSales
 * @return delta
 */
function deltaProductSales(lastPeriodProductSales, thisPeriodProductSales) {
  const delta = thisPeriodProductSales - lastPeriodProductSales;
  return delta;
}
/*
  Define delta product sales types:
  < 0: Product performance worsened (negative performance)
  = 0: Product performance stayed the same
  > 0: Product performance improved (positive performance)
*/
/**
 * Return a message based on the delta product sales.
 * @param {int} delta
 * @returns {String} message
 */
function deltaProductSalesMessage(delta) {
  if (delta < 0) {
    return "Product performance worsened";
  } else if (delta === 0) {
    return "Product performance stayed the same";
  } else {
    return "Product performance improved";
  }
}

/**
 * Basically profit:cost ratio.
 * @param {number} price
 * @param {number} cost
 * @returns profitability score.
 */
function productProfitScore(price, cost) {
  return (price - cost) / cost;
}

/**
 * Calculate the zScore and quantile rank of a product sales compared to the sales of all products.
 *
 * The array of sales of all products can be an array of sales of the same product across all stores
 * or an array of sales of different products inside the same store.
 * @param {int[]} arrayOfSales
 * @param {int} productSales
 * @returns {{zScore: number, quantileRank: number}}
 */
function productRelativeSalesScore(arrayOfSales, productSales) {
  const mean = ss.mean(arrayOfSales);
  const std = ss.standardDeviation(arrayOfSales);
  const zScore = (productSales - mean) / std;
  const quantileRank = ss.quantileRank(arrayOfSales, productSales);
  return { zScore, quantileRank };
}

/* 
  Define the product sales score of a product:
  The score is a combination of the zScore and the quantile rank.

  zScore of:
  < -1.5: very poor performing product
  -1.5 <= zScore < 0: poor performing product
  0 <= zScore < 1.5: average performing product
  1.5 <= zScore < 3: good performing product
  3 <= zScore: very good performing product

  quantileRank of:
  0 <= quantileRank < 0.25: very poor performing product
  0.25 <= quantileRank < 0.5: poor performing product
  0.5 <= quantileRank < 0.75: average performing product
  0.75 <= quantileRank < 1: good performing product
*/
/**
 * Requirement: The number of other products sold must be at least 10.
 * If the number of other products sold is less than 10, then the score
 * is determined from the quantile rank.
 * @param {number} zScore
 * @param {number} quantileRank
 * @param {int} numberOfOtherProducts
 * @returns {String} message
 */
function productRelativePerformanceMessage(
  zScore,
  quantileRank,
  otherProductsSold
) {
  if (otherProductsSold < 10) {
    if (quantileRank < 0.25) {
      return "Very poor performing product";
    } else if (quantileRank < 0.5) {
      return "Poor performing product";
    } else if (quantileRank < 0.75) {
      return "Average performing product";
    }
    return "Good performing product";
  }
  if (zScore < -1.5) {
    return "Very poor performing product";
  } else if (zScore < 0) {
    return "Poor performing product";
  } else if (zScore < 1.5) {
    return "Average performing product";
  } else if (zScore < 3) {
    return "Good performing product";
  } else {
    return "Very good performing product";
  }
}

/**
 * Given an array of sales of a subset of products,
 * return the product that is most profitable.
 *
 * @param {Object[]} productSales
 * @returns The product sales of the product with the highest total profit.
 */
function mostProfitableProduct(productSales) {
  const mostProfitableProduct = productSales.reduce((a, b) => {
    return a.total_profit > b.total_profit ? a : b;
  });

  return mostProfitableProduct;
}

function mostSoldProduct(productSales) {
  const mostSoldProduct = productSales.reduce((a, b) => {
    return a.quantity > b.quantity ? a : b;
  });

  return mostSoldProduct;
}

module.exports = {
  deltaProductSales,
  deltaProductSalesMessage,
  productProfitScore,
  productRelativeSalesScore,
  productRelativePerformanceMessage,
  mostProfitableProduct,
  mostSoldProduct,
};
