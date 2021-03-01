const model = require('../models/cookModelUsers');
const { zero } = require('../utils/messages');

const userCreate = async (name, email, password, role) => {
  const user = await model.createUser(name, email, password, role);
  return user;
};

const emailExist = async (_name, email, _password) => {
  const emaildobanco = await model.getAllUsers();
  const emails = emaildobanco.filter((user) => user.email === email);
  if (emails.length > zero) return false;
  return true;
};

module.exports = {
  userCreate,
  emailExist,
};
