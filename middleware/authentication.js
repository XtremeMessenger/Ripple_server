const jwt = require('jsonwebtoken');
const env = require('../config/env.js');

module.exports.generateToken = ({ username, id }) => {

  const token = {};

  token.accessToken = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    username,
    id
  }, env.TOKEN_SECRET);
  return token;
};

module.exports.verifyUserWithJWT = (req, res, next) => {
  console.log('authentication request ', req.body)
  try {
    jwt.verify(req.headers.authorization.slice(7), env.TOKEN_SECRET);
    console.log('token verified');
    next();
  } catch (e) {
    console.log('token not verified');
    next(e);
  }
};