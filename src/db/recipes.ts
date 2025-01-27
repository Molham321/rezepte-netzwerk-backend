import mongoose from "mongoose";

// Recipes Config
const RecipesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  imageURL: { type: String, required: false },
  likes: { type: Number, required: true, default: 0 },
  servings: { type: Number, required: true, default: 1 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
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
        enum: ['category_01', 'category_02', 'category_03', 'category_04', 'category_05',
          'Vorspeisen', 'Hauptspeisen', 'Desserts', 'Snacks', 'Getränke',
          'Spaghetti', 'Rind', 'Geflügel', 'Fisch', 'Schwein', 'Vegetarisch', 'Vegan',
          'Italienisch', 'Deutsch', 'Japanisch', 'Indisch', 'Mexikanisch', 'Andere'],
      }
    ],
    required: true,
  },

  likedBy: {
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    required: false
  },

  savedBy: {
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    required: false
  }
});

export const RecipesModel = mongoose.model('Recipe', RecipesSchema);

// Recipes Actions
export const getRecipes = () => RecipesModel.find();
export const getOwnerRecipes = (id: string) => RecipesModel.find({ createdBy: id });
export const getRecipeById = (id: string) => RecipesModel.findById(id);
export const createRecipe = (values: Record<string, any>) => new RecipesModel(values).save().then((recipe) => recipe.toObject());
export const deleteRecipeById = (id: string) => RecipesModel.findOneAndDelete({ _id: id });
export const updateRecipeById = (id: string, values: Record<string, any>) => RecipesModel.findByIdAndUpdate(id, values);
export const getRecipesByCategory = (category: string) => RecipesModel.find({ category: category });

export const likeRecipe = (id: string, values: Record<string, any>) => RecipesModel.findByIdAndUpdate(id, values);
export const saveRecipe = (id: string, values: Record<string, any>) => RecipesModel.findByIdAndUpdate(id, values);

export const getSavedRecipesByUser = (userId: string) => RecipesModel.find({ savedBy: userId });

export const postComment = (id: string, values: Record<string, any>) => RecipesModel.findByIdAndUpdate(id, values);
export const deleteComment = (id: string, commentIndex: number) => RecipesModel.findById(id);