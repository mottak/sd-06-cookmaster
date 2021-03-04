const { Router } = require('express');
const jwt = require('jsonwebtoken');
// const rescue = require('express-rescue');
const modelLogin = require('../models');

const login = Router();
const secretPassword = 'Root2021';

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

login.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }
    const usersByEmail = await modelLogin.login.findUserByEmail({ email });
    if (!usersByEmail || usersByEmail.password !== password) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }
    delete usersByEmail.password;
    const payload = {
      iss: 'post_api', aud: 'identify', usersByEmail,
    };
    const token = jwt.sign(payload, secretPassword, jwtConfig);
    res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: `Intern Error: ${err}` });
  }
});

module.exports = login;
