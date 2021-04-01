const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const { UNAUTHORIZED } = require('../utils/statusCodeHandler');
const { secret } = require('../utils/token');

const verifyToken = rescue(async (request, response, next) => {
  const token = request.headers.authorization;

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return response.status(UNAUTHORIZED.code).json({ message: 'jwt malformed' });
    request.userId = decoded.id;
    
    return next();
  });
});

module.exports = {
  verifyToken,
};
