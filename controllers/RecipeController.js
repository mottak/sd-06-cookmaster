const { Router } = require('express');
const rescue = require('express-rescue');

const RecipeService = require('../service/RecipeService');
const { validateField, recipeIsValid } = require('../middlewares/recipeValidation');
const { validateToken } = require('../auth/validateJWT');

const router = Router();
const CREATED = 201;
const OK = 200;
const NO_CONTENT = 204;

const recipeEndpoint = '/recipes/:id';

router.post('/recipes', validateField, validateToken, rescue((async (req, res) => {
  const { name, preparation, ingredients } = req.body;
  const { _id } = req.user;
  const recipe = {
    name,
    preparation,
    ingredients,
    userId: _id,
  };
  const result = await RecipeService.createRecipe(recipe);

  return res.status(CREATED).json(result);
})));

router.get('/recipes', rescue((async (req, res) => {
  const allRecipes = await RecipeService.getAll();
  return res.status(OK).json(allRecipes);
})));

router.get(recipeEndpoint, recipeIsValid, rescue((async (req, res) => {
  const { id } = req.params;
  const recipe = await RecipeService.getById(id);
  // console.log('teste recipe', recipe);
  return res.status(OK).json(recipe);
})));

router.put(recipeEndpoint, validateToken, rescue((async (req, res) => {
  const { id } = req.params;
  // const { _id } = req.user;
  const { name, preparation, ingredients } = req.body;
  const updatedRecipe = {
    name,
    preparation,
    ingredients,
  };

  const result = await RecipeService.updateRecipe(id, updatedRecipe);
  console.log('resultado controller', result);
  return res.status(OK).json(result);
})));

router.delete(recipeEndpoint, validateToken, rescue((async (req, res) => {
  const { id } = req.params;

  await RecipeService.deleteRecipe(id);
  res.status(NO_CONTENT).json({});
})));

module.exports = router;
