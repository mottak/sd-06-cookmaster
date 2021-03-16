const {
  getAllRecipes,
  createNewRecipe,
  findRecipe,
  updateRecipes,
  deleteRecipes,
  addImageInRecipe,
  getImageRecipe,
} = require('../models/recipeModel');

const newRecipe = async (recipe) => {
  try {
    await createNewRecipe(recipe);
    return true;
  } catch (e) {
    return null;
  }
};

const lastRecipe = async () => {
  const allUsers = await getAllRecipes();
  const lastUserIndex = allUsers.length - 1;
  return allUsers[lastUserIndex];
};

const searchAllRecipes = async () => {
  try {
    return await getAllRecipes();
  } catch (e) {
    return null;
  }
};

const findRecipeById = async (id) => {
  try {
    return await findRecipe(id);
  } catch (e) {
    return null;
  }
};

const toUpdateRecipe = async (id, recipe) => {
  try {
    return await updateRecipes(id, recipe);
  } catch (e) {
    return null;
  }
};

const recipeToDelete = async (id) => {
  try {
    return await deleteRecipes(id);
  } catch (e) {
    return null;
  }
};

const pushImageRecipe = async (objectToAddImage) => {
  try {
    return await addImageInRecipe(objectToAddImage);
  } catch (e) {
    return null;
  }
};

const searchImage = async (id) => {
  try {
    return await getImageRecipe(id);
  } catch (e) {
    return null;
  }
};

module.exports = {
  newRecipe,
  lastRecipe,
  searchAllRecipes,
  findRecipeById,
  toUpdateRecipe,
  recipeToDelete,
  pushImageRecipe,
  searchImage,
};
