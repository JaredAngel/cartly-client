export const findRecipe = (recipes=[], recipeId) => {
  return recipes.find(recipe => recipe.id === parseInt(recipeId));
};

export const findIngredient = (ingredients=[], ingredientId) => {
  return ingredients.find(ingredient => ingredient.id === parseInt(ingredientId));
}

export const getIngredientsForRecipe = (ingredients=[], recipeId) => {
  if(!recipeId) {
    return ingredients;
  } else {
    return ingredients.filter(ingredient => ingredient.recipe_id === parseInt(recipeId));
  }
};

export const countIngredientsForRecipe = (ingredients=[], recipeId) => {
  return ingredients.filter(ingredient => ingredient.recipe_id === recipeId).length;
};