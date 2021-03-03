// const { ObjectId } = require('mongodb');
const user = require('../models/user');

const getAll = async () => {
  await user.getAll();
};

const createUser = async (userInfo) => {
  const newUser = await user.createUser(userInfo);
  console.log('newUser', newUser);
  return newUser;
};

module.exports = {
  getAll,
  createUser,
};