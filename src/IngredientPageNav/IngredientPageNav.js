import React from 'react';
import { NavLink } from 'react-router-dom';
import ApiContext from '../ApiContext';
import { findIngredient, findRecipe } from '../ingredients-helper';
import './IngredientPageNav.css';

class IngredientPageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  };
  static contextType = ApiContext;

  render() {
    const { ingredients, recipes } = this.context;
    const { ingredientId } = this.props.match.params;
    const ingredient = findIngredient(ingredients, ingredientId) || {};
    const recipe = findRecipe(recipes, ingredient.recipe_id);

    return (
      <div className='IngredientPageNav'>
        {ingredientId && <h2 className='IngredientPageNav__header'>
          <NavLink
            to={`/recipe/${ingredient.recipe_id}`}
          >
            {recipe.title}
          </NavLink>
        </h2>}
        <ul className='IngredientPageNav__list'>
          {ingredients.map(ingredient =>
            <li key={ingredient.id}>
              <NavLink
                className='IngredientPageNav__ingredient-link'
                to={`/ingredient/${ingredient.id}`}
              >
                {ingredient.title}
              </NavLink>
            </li>
          )}
        </ul>
        <button
          className='IngredientPageNav__back-button'
          onClick={() => this.props.history.goBack()}
          role='link'
          tag='button'
        >
          <br />
          Back
        </button>
      </div>
    );
  }
}

export default IngredientPageNav;