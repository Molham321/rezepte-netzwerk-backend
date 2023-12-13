
import express from "express";

import { getAllRecipes, getAllOwnerRecipes, getRecipe, createNewRecipe, deleteRecipe, updateRecipe, getCategoryRecipes } from "../controllers/recipes";
import { isAuthenticated, isRecipesOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get('/recipes', getAllRecipes);
  router.get('/recipes/owner/:id', getAllOwnerRecipes);
  router.get('/recipes/:id', getRecipe);
  router.post('/recipes/create', isAuthenticated, createNewRecipe);
  router.patch('/recipes/:id', isAuthenticated, isRecipesOwner, updateRecipe);
  router.delete('/recipes/:id', isAuthenticated, isRecipesOwner, deleteRecipe);
  router.get('/recipes/category/:category', getCategoryRecipes);
};