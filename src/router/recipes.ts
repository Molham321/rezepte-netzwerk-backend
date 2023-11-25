
import express from "express";

import { getAllRecipes, getAllOwnerRecipes, getRecipe, createNewRecipe, deleteRecipe, updateRecipe } from "../controllers/recipes";
import { isAuthenticated, isRecipesOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get('/recipes', isAuthenticated, getAllRecipes);
  router.get('/recipes/owner/:id', isAuthenticated, getAllOwnerRecipes);
  router.get('/recipes/:id', isAuthenticated, getRecipe);
  router.post('/recipes/create', isAuthenticated, createNewRecipe);
  router.patch('/recipes/:id', isAuthenticated, isRecipesOwner, updateRecipe);
  router.delete('/recipes/:id', isAuthenticated, isRecipesOwner, deleteRecipe);
};