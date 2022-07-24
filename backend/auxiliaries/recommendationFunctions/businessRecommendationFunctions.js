/**
 * Check whether the user has a business.
 * Returns a message asking user to create a business.
 * @param {boolean} userHasABusiness
 * @param {String[]} highPerformersProducts
 * @returns {String} recommendation
 */
function createBusinessRecommendation(
  userHasABusiness,
  highPerformersProducts
) {
  if (!userHasABusiness) {
    return (
      "Please create a business first. You might be interested in opening business in " +
      highPerformersProducts +
      " ."
    );
  }
}

/**
 * Chech whether the business is digitalized.
 * Returns a message asking user to digitalize the business on the correct platform.
 * @param {boolean} businessIsDigitalized
 * @param {String} businessCategory
 * @param {String[]} businessPlatforms
 * @param {HashMap} suitablePlatforms - What I mean is basically we assume that we have mapped
 * business categories with the recommended respective platforms.
 * Something like {Shopee: Fashion, Skincare, Clothings ; Tokopedia: Electronics}.
 * @returns {String} recommendation
 */
function digitalizeBusinessRecommendation(
  businessIsDigitalized,
  businessCategory,
  suitablePlatforms
) {
  // Search the suitable platform based on the category
  const platform = suitablePlatforms.get(businessCategory);

  // Recommendation if business is not yet digitalized
  if (!businessIsDigitalized) {
    return (
      "You can start digitalizing your business! Based on our analysis, your business will thrive in " +
      platform +
      " !"
    );

    // Recommendation if business is digitalized but does not have account on the correct platform
  } else if (businessPlatforms.get(platform) == null) {
    return (
      "Good job on digitalizing your business! Your business might thrive more if you also open it on " +
      platform +
      " !"
    );
  }
}

/**
 * Check the sales of products.
 * Returns a recommendation on how to maximize sales.
 * @param {number} selfSalesScore
 * @param {number} competitorSalesScore
 * @param {String} businessPlatformFAQLink
 * selfProduct[0] is the cost to obtain that product
 * selfProduct[1] is the selling price of that product
 * @param {number[]} selfProduct
 * @param {number[]} competitorProduct
 * @returns {String[]} recommendation
 */
function salesRecommendation(
  selfSalesScore,
  competitorSalesScore,
  businessPlatformFAQLink,
  selfProduct,
  competitorProduct
) {
  // Sales performance is worse than others
  if (selfSalesScore < competitorSalesScore) {
    // Recommendation on seller and ads features and link on how to set up
    const sellerFeatures =
      "Increase your business reputation among customers by setting up a credible seller account. Check out this page. " +
      businessPlatformFAQLink;

    const adsFeatures =
      "Make use of the ads features on your marketplace. Learn more here. " +
      businessPlatformFAQLink;

    // Check if the cost to obtain this product is lower AND the price of this product is higher than competitor
    if (
      selfProduct[0] < competitorProduct[0] &&
      selfProduct[1] >= competitorProduct[1]
    ) {
      const lowerPrice = "You can lower your price to attract more customers.";
      return [sellerFeatures, adsFeatures, lowerPrice];
      // Check if the cost to obtain this product is higher AND the price of this product is lower than competitor
    } else if (
      selfProduct[0] > competitorProduct[0] &&
      selfProduct[1] <= competitorProduct[1]
    ) {
      const decreaseCost =
        "You might want to consider to decrease the cost of your product.";
      return [sellerFeatures, adsFeatures, decreaseCost];
      // Check if the cost to obtain this product is lower AND the price of this product is lower than competitor
    } else if (
      selfProduct[0] <= competitorProduct[0] &&
      selfProduct[1] <= competitorProduct[1]
    ) {
      const promotion =
        "Your product has a good potential! All you need is to do more promotion.";
      return [sellerFeatures, adsFeatures, promotion];
    }
    // Sales performance is better than others
  } else {
    const contentCreator =
      "Be an influencer! Generate contents like feeds and reels on social medias such as Instagram, TikTok or Facebook."; // Add link to the respective platforms
    const ads =
      "You might want to utilize the ads feature on Facebook and Instagram."; // Add link to the YouTube tutorial on using ads
    const giveAway =
      "You can hire an influencer to review your products. Better yet, do a giveaway!"; // Add link to article on how to do this
    const catalogue =
      "Invest in better image quality of your product catalogue. There are some cheap high-quality photographers here."; // Add link to the photographers social medias
    const expandBusiness =
      "Expand your reach by setting up store on other platforms."; // Add link to ther e-commerces
    const expandProduct =
      "Expand your product range! You might want to try selling this."; // + famous products list
    return [
      contentCreator,
      ads,
      giveAway,
      catalogue,
      expandBusiness,
      expandProduct,
    ];
  }
}

module.exports = {
  createBusinessRecommendation,
  digitalizeBusinessRecommendation,
  salesRecommendation,
};
