import mongoose from "mongoose";

// Recipes Config
const RecipesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  imageURL: { type: String, required: false },
  likes: { type: Number, required: false, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdDate: { type: Date, default: Date.now, required: true },
  prepTime: { type: Number, required: true, min: 0 },

  ingredients: [
    {
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
      ingredient: { type: String, required: true },
    }
  ],

  steps: [
    {
      order: { type: Number, required: true },
      description: { type: String, required: true },
    }
  ],

  comments: [
    {
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      createdDate: { type: Date, default: Date.now, required: true },
      comment: { type: String, required: true },
    }
  ],

  category: {
    type: [
      {
        type: String,
        enum: ['category_01', 'category_02', 'category_03', 'category_04', 'category_05', 'Other'],
      }
    ],
    required: true,
  },
});

export const RecipesModel = mongoose.model('Recipe', RecipesSchema);

// Recipes Actions
export const getRecipes = () => RecipesModel.find();
export const getRecipeById = (id: string) => RecipesModel.findById(id);
export const createRecipe = (values: Record<string, any>) => new RecipesModel(values).save().then((recipe) => recipe.toObject());
export const deleteRecipeById = (id: string) => RecipesModel.findOneAndDelete({ _id: id });
export const updateRecipeById = (id: string, values: Record<string, any>) => RecipesModel.findByIdAndUpdate(id, values);