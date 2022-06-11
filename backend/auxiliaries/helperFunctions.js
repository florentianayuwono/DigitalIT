const jwt = require('jsonwebtoken');

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
      expiresIn: '30d'
  })
}

module.exports = { getDate, generateToken };