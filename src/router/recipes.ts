
import express from "express";

import { getAllRecipes, getAllOwnerRecipes, getRecipe, createNewRecipe, deleteRecipe, updateRecipe, getCategoryRecipes, likeRecipeById, saveRecipeById, getSavedRecipes, postCommentById, deleteCommentById } from "../controllers/recipes";

export default (router: express.Router) => {
  router.get('/recipes', getAllRecipes);
  router.get('/recipes/owner/:id', getAllOwnerRecipes);
  router.get('/recipes/:id', getRecipe);
  router.post('/recipes/create', createNewRecipe);
  router.patch('/recipes/:id', updateRecipe);
  router.delete('/recipes/:id', deleteRecipe);
  router.get('/recipes/category/:category', getCategoryRecipes);

  router.post('/recipes/like/:id', likeRecipeById);
  router.post('/recipes/save/:id', saveRecipeById);

  router.get('/recipes/saved/:userId', getSavedRecipes);

  router.post('/recipes/comments/create/:id', postCommentById);
  router.post('/recipes/comments/delete/:id', deleteCommentById);
};