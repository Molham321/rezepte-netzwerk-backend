
import express from "express";

import { getRecipes, getRecipeById, createRecipe, deleteRecipeById, updateRecipeById } from "../db/recipes";

export const getAllRecipes = async (req: express.Request, res: express.Response) => {
  try {
    const recipes = await getRecipes();

    return res.status(200).json(recipes);

  } catch (error) {
    console.log(error)
    return res.sendStatus(400);
  }
}