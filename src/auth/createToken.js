const jwt = require('jsonwebtoken');

const secret = 'cookmaster';

module.exports = (payload) => {
  const headers = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };

  return jwt.sign(payload, secret, headers);
};