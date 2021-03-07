/* eslint-disable no-underscore-dangle */
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () =>
  connection().then((db) => db.collection('recipes').find().toArray());
  
const findById = async (id) =>
  connection().then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

const create = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connection().then((db) => db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId }));
      
  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: insertedId,
  };
};

const update = async (name, ingredients, preparation, recipe) => {
  await connection().then((db) => db.collection('recipes')
    .updateOne(
      { _id: recipe._id },
      { $set: { name, ingredients, preparation }},
      { upsert: false },
    ));
  
  return {
    _id: recipe._id,
    name,
    ingredients,
    preparation,
    userId: recipe.userId,
  };
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};
