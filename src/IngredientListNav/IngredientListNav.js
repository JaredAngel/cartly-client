import React from 'react';
import { NavLink } from 'react-router-dom';
import ApiContext from '../ApiContext';
import { countIngredientsForRecipe } from '../ingredients-helper';
import './IngredientListNav.css';

class IngredientListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { recipes = [], ingredients = [] } = this.context;

    return (
      <div className='IngredientListNav'>
        <h2 className='IngredientListNav__header'>
          <NavLink to='/'>My Recipes</NavLink>
        </h2>
        <ul className='IngredientListNav__list'>
          {recipes.map(recipe => 
            <li key={recipe.id}>
              <NavLink
                className='IngredientListNav__recipe-link'
                to={`/recipe/${recipe.id}`}
              >
                <span className='IngredientListNav__num-ingredients'>
                  {countIngredientsForRecipe(ingredients, recipe.id)}
                </span>
                {recipe.title}
              </NavLink>
            </li>
          )}
        </ul>
        <div className='IngredientListNav__button-wrapper'>
          <button
            className='IngredientListNav__add-recipe-button'
            type='button'
            onClick={e => {
              this.props.history.push('/add-recipe')
            }}
            to='/add-recipe'
          >
            Add Recipe
          </button>
        </div>
      </div>
    );
  }
}

export default IngredientListNav;