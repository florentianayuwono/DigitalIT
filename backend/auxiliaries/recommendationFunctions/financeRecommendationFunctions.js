/** COMPARISON OF GROWTH PROGRESS */

/**
 * Measure the growth progress
 * Returns an insight.
 * @param {int[]} revenue
 * @return {String} insight
 */
function revenueGrowthInsight(revenue) {
  // Compare the last period with previous period
  if (revenue[revenue.length - 1] > revenue[revenue.length - 2]) {
    return "You are progressing well! Keep improving!";
  } else if (revenue[revenue.length - 1] == revenue[revenue.length - 2]) {
    return "Your performance is stable. But can you grow your business more?";
  } else {
    return "Don't lose hope! We are with you. Check out our recommendations to improve your business.";
  }
}

/**
 * Measure the growth progress
 * Returns an insight.
 * @param {int[]} netProfit
 * @return {String} insight
 */
function profitGrowthInsight(netProfit) {
  // Compare the last period with previous period
  if (netProfit[netProfit.length - 1] > netProfit[netProfit.length - 2]) {
    return "You are progressing well! Keep improving!";
  } else if (
    netProfit[netProfit.length - 1] == netProfit[netProfit.length - 2]
  ) {
    return "Your performance is stable. But can you grow your business more?";
  } else {
    return "Don't lose hope! We are with you. Check out our recommendations to improve your business.";
  }
}

/**
 * Check the growth correlation
 * Returns an insight and recommendation
 * @param {boolean} profitIncrease
 * @param {boolean} revenueIncrease
 * @return {String} recommendation
 */
function growthCorrelation(profitIncrease, revenueIncrease) {
  if (revenueIncrease && !profitIncrease) {
    return "You might neet to watch out for your product cost or other expense. Looks like it is hindering your profit growth!";
  }
}

/**
 * Check the promotion expense
 * Returns an insight and recommendation
 * @param {number} operationalExpense
 * @param {number} totalRevenue
 * @return {String} recommendation
 */
function growthCorrelation(operationalExpense, totalRevenue) {
  if (operationalExpense <= 0.05 * totalRevenue) {
    return "You might be able to boost your revenue by holding more promotions for your products!";
  }
}

/** FINANCIAL RATIO ANALYSIS */

/**
 * Measure the current ratio.
 * @param {int} currentAssets
 * @param {int} currentLiabilities
 * @return {number} currentRatio
 */
function currentRatio(currentAssets, currentLiabilities) {
  return currentAssets / currentLiabilities;
}

/**
 * Measure the debt-to-equity ratio.
 * @param {int} totalAssets
 * @param {int} totalLiabilities
 * @return {number} debtToEquityRatio
 */
function debtToEquityRatio(totalAssets, totalLiabilities) {
  return totalLiabilities / (totalAssets - totalLiabilities);
}

/**
 * Measure the net profit margin
 * @param {int} netProfit
 * @param {int} totalRevenue
 * @return {number} netProfitMargin
 */
function netProfitMargin(netProfit, totalRevenue) {
  return netProfit / totalRevenue;
}

/**
 * Measure the return to total asset
 * @param {int} netProfit
 * @param {int} totalAssets
 * @return {number} returnOnTotalAssets
 */
function returnOnTotalAssets(netProfit, totalAssets) {
  return netProfit / totalAssets;
}

/**
 * Measure the return to equity
 * @param {int} netProfit
 * @param {int} totalAssets
 * @param {int} totalLiabilities
 * @return {number} returnOnEquity
 */
function returnOnEquity(netProfit, totalAssets, totalLiabilities) {
  return netProfit / (totalAssets - totalLiabilities);
}

/** FINANCIAL RECOMMENDATION */

/**
 * Check the liquidity condition.
 * @param {number} currentRatio
 * @return {String} recommendation
 */
function liquidityRecommendation(currentRatio) {
  if (currentRatio < 1) {
    return "Oh no! You might not be able to pay back all your short-term liabilities. Stop borrowing and focus on paying back your liabilities.";
  } else if (currentRatio == 1) {
    return "You are in a quite fragile position. Consider stop borrowing and focus on increasing your assets.";
  } else {
    return "You are quite safe. You can still pay back all your current liabilities!";
  }
}

/**
 * Check the solvency condition.
 * @param {number} debtToEquityRatio
 * @return {String} recommendation
 */
function solvencyRecommendation(debtToEquityRatio) {
  if (debtToEquityRatio < 1) {
    return "You are quite safe. You can still pay back all your debt!";
  } else if (debtToEquityRatio == 1) {
    return "You are in a quite fragile position. Consider stop borrowing and focus on increasing your equity.";
  } else {
    return "Oh no! You are in danger of bankruptcy. You have more debt than equity!";
  }
}

/**
 * Check the profitability on asset condition.
 * @param {number} returnOnTotalAssets
 * @return {String} recommendation
 */
function profitabilityOnAssetsRecommendation(returnOnTotalAssets) {
  if (returnOnTotalAssets < 0.05) {
    return "Your assets are not efficient in generating profit. Consider switching to more productive type of assets.";
  } else if (returnOnTotalAssets < 0.2) {
    return "Your assets are quite efficient in generating profit. Keep the productive assets coming!";
  } else {
    return "Excellent! Your assets are very efficient in generating profit. Keep improving!";
  }
}

/**
 * Check the profitability on equity condition.
 * @param {number} returnOnEquity
 * @return {String} recommendation
 */
function profitabilityOnEquityRecommendation(returnOnEquity) {
  if (returnOnEquity < 0.1) {
    return "This business has a quite low return. Keep growing your profit or consider switching to other business!";
  } else if (returnOnEquity < 0.2) {
    return "This business has a good return! Keep growing and improving!";
  } else {
    return "Excellent! This business is a very good investment! You can try raising more capital.";
  }
}

module.exports = {
  revenueGrowthInsight,
  profitGrowthInsight,
  growthCorrelation,
  currentRatio,
  debtToEquityRatio,
  netProfitMargin,
  returnOnEquity,
  returnOnTotalAssets,
  liquidityRecommendation,
  solvencyRecommendation,
  profitabilityOnAssetsRecommendation,
  profitabilityOnEquityRecommendation,
};
