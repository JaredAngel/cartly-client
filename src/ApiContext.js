import React from 'react';

export default React.createContext({
  ingredients: [],
  recipes: [],
  addRecipe: () => {},
  addIngredient: () => {},
  deleteIngredient: () => {},
});