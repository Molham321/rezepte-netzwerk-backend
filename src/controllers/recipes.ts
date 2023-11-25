
import express from "express";

import { get } from "lodash";
import { getRecipes, getRecipeById, getOwnerRecipes, createRecipe, deleteRecipeById, updateRecipeById } from "../db/recipes";

export const getAllRecipes = async (req: express.Request, res: express.Response) => {
  try {
    const recipes = await getRecipes();

    return res.status(200).json(recipes);

  } catch (error) {
    console.log(error)
    return res.sendStatus(400);
  }
}

export const getAllOwnerRecipes = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const recipes = await getOwnerRecipes(id);

    return res.status(200).json(recipes);

  } catch (error) {
    console.log(error)
    return res.sendStatus(400);
  }
}

export const getRecipe = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const recipe = await getRecipeById(id);

    return res.status(200).json(recipe);

  } catch (error) {
    console.log(error)
    return res.sendStatus(400);
  }
}

export const createNewRecipe = async (req: express.Request, res: express.Response) => {
  try {
    const { title, description, imageURL, prepTime, ingredients, steps, category } = req.body;

    if (!title || !description || !imageURL || !prepTime || !ingredients || !steps || !category) {
      return res.sendStatus(400);
    }

    const createdBy = get(req, 'identity._id');

    const recipe = await createRecipe({
      title,
      description,
      imageURL,
      createdBy,
      prepTime,
      ingredients,
      steps,
      category,
    });

    return res.status(200).json(recipe).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const deleteRecipe = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const deleteRecipe = await deleteRecipeById(id);

    return res.json(deleteRecipe);

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const updateRecipe = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { title, description, imageURL, prepTime, ingredients, steps, category } = req.body;

    const recipe = await getRecipeById(id);

    if (title !== undefined) {
      recipe.title = title;
    }

    if (description !== undefined) {
      recipe.description = description;
    }

    if (imageURL !== undefined) {
      recipe.imageURL = imageURL;
    }

    if (prepTime !== undefined) {
      recipe.prepTime = prepTime;
    }

    if (ingredients !== undefined) {
      recipe.ingredients = ingredients;
    }

    if (steps !== undefined) {
      recipe.steps = steps;
    }

    if (category !== undefined) {
      recipe.category = category;
    }

    await recipe.save();

    return res.status(200).json(recipe).end();

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}