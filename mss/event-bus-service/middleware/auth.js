const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function (req, res, next) {
  //Get the token from header
  const token = req.header('x-auth-token');
  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  //Verify Token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
