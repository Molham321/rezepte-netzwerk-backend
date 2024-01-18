
import express from "express";

import { getAllRecipes, getAllOwnerRecipes, getRecipe, createNewRecipe, deleteRecipe, updateRecipe, getCategoryRecipes } from "../controllers/recipes";
import { isAuthenticated, isRecipesOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get('/recipes', getAllRecipes);
  router.get('/recipes/owner/:id', getAllOwnerRecipes);
  router.get('/recipes/:id', getRecipe);
  router.post('/recipes/create', createNewRecipe);
  router.patch('/recipes/:id', isAuthenticated, isRecipesOwner, updateRecipe);
  router.delete('/recipes/:id', deleteRecipe); // ich musste hier isAuthenticated & isRecipesOwner löschen weil das mit dem cookies nicht funktioniert was ich schade finde :/
  router.get('/recipes/category/:category', getCategoryRecipes);
};