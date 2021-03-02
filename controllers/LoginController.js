const { Router } = require('express');
const users = require('../models/users');
const service = require('../services/UserService');
const createToken = require('../auth/createToken');

const LoginController = new Router();
const status200 = 200;

LoginController.post('/', service.validateLogin, async (request, response) => {
  const { email } = request.body;

  const user = await users.findUserByEmail(email);
  const token = createToken(user);

  return response.status(status200).json({ token });
});

module.exports = LoginController;
