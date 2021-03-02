const jwt = require('jsonwebtoken');

const UNAUTHORIZED = 401;

const secret = 'senha';
const BAD_REQ = 400;

const validateRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(BAD_REQ).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
  const payload = jwt.verify(token, secret, {
    iss: 'Cookmaster', 
    aud: 'identity',
  });

  if (typeof payload === 'string') {
    throw new Error('jwt malformed');
  }
  } catch (err) {
  return res.status(UNAUTHORIZED).json({ message: err.message });
  }
  next();
};

module.exports = {
  validateRecipe,
  validateToken,
};
