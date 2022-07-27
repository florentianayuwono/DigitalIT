const jwt = require("jsonwebtoken");

// Get today's date
const getDate = () => {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let seconds = date_ob.getSeconds();

  return year + "-" + month + "-" + date;
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// parse date range to miliseconds
const dateRangeParser = (date_range) => {
    switch (parseInt(date_range)) {
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

module.exports = { getDate, generateToken, dateRangeParser };
