import React from 'react';
import Ingredient from '../Ingredient/Ingredient';
import ApiContext from '../ApiContext';
import { findIngredient } from '../ingredients-helper';
import './IngredientPageMain.css';

class IngredientPageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };
  static contextType = ApiContext;

  handleDeleteIngredient = ingredientId => {
    this.props.history.push(`/`)
  }

  render() {
    const { ingredients = [] } = this.context;
    const { ingredientId } = this.props.match.params;
    const ingredient = findIngredient(ingredients, parseInt(ingredientId)) || { content: '' };

    return (
      <section className='IngredientPageMain'>
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
        <Ingredient
          id={ingredient.id}
          title={ingredient.title}
          label={ingredient.label}
          onDeleteIngredient={this.handleDeleteIngredient}
        />
        <div className='IngredientPageMain__content'>
          {ingredient.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>Notes/Quantity: {para}</p>
          )}
        </div>
      </section>
    );
  }
}

export default IngredientPageMain;