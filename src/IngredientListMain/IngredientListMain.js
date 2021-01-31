import React from 'react';
import Ingredient from '../Ingredient/Ingredient';
import ApiContext from '../ApiContext'
import { getIngredientsForRecipe } from '../ingredients-helper';
import './IngredientListMain.css';

class IngredientListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };
  static contextType = ApiContext;

  render() {
    const { recipeId } = this.props.match.params;
    const { ingredients = [] } = this.context;
    const ingredientsForRecipe = getIngredientsForRecipe(ingredients, recipeId);

    return (
      <section className='IngredientListMain'>
        <div className='IngredientListMain__button-container'>
          <button
            className='IngredientListMain__add-ingredient-button'
            type='button'
            onClick={e => {
              this.props.history.push('/add-ingredient')
            }}
            to='/add-ingredient'
          >
            Add Ingredient
          </button>
        </div>
        <ul>
          {ingredientsForRecipe.map(ingredient =>
            <li key={ingredient.id}>
              <Ingredient
                id={ingredient.id}
                title={ingredient.title}
                label={ingredient.label}
              />
            </li>
          )}
        </ul>
      </section>
    );
  }
}

export default IngredientListMain;