import React from 'react';
import RecipeForm from '../RecipeForm/RecipeForm';
import ApiContext from '../ApiContext';
import config from '../config';
import './AddIngredient.css';
import token from '../services/token-service';

class AddIngredient extends React.Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  };
  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault();
    const newIngredient = {
      title: e.target['ingredient-title'].value,
      content: e.target['ingredient-content'].value,
      label: e.target['ingredient-label'].value,
      recipe_id: e.target['ingredient-recipe-id'].value,
    };
    fetch(`${config.API_ENDPOINT}/ingredients`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${token.getAuthToken()}`,
      },
      body: JSON.stringify(newIngredient),
    })
    .then(res => {
      if(!res.ok) {
        return res
          .json()
          .then(e =>
            Promise.reject(e)
          );
      }
      return res.json();
    })
    .then(ingredient => {
      this.context.addIngredient(ingredient)
      this.props.history.push(`/recipe/${ingredient.recipe_id}`)
    })
    .catch(error => {
      console.error({ error })
    });
  }

  render() {
    const { recipes = [] } = this.context;

    return (
      <section className='AddIngredient'>
        <h2>Add Ingredient</h2>
        <RecipeForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='ingredient-title-input'>
              Title
            </label>
            <input 
              type='text'
              id='ingredient-title-input'
              name='ingredient-title'
              placeholder="Roma Tomatoes..."
              required
            />
          </div>
          <div className='field'>
            <label htmlFor='ingredient-content-input'>
              Notes/Quantity
            </label>
            <textarea
              id='ingredient-content-input'
              name='ingredient-content'
              required
            />
          </div>
          <div className='field'>
            <label htmlFor='ingredient-label-input'>
              Label
            </label>
            <select id='ingredient-label-input' name='ingredient-label' required>
              <option key={null}>Select One</option>
              <option value='Spices'>Spices</option>
              <option value='Meat/Fish'>Meat/Fish</option>
              <option value='Produce'>Produce</option>
              <option value='Refrigerated'>Refrigerated</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div className='field'>
            <label htmlFor='ingredient-recipe-select'>
              Recipe
            </label>
            <select id='ingredient-recipe-select' name='ingredient-recipe-id' required>
              <option key={null}>...</option>
              {recipes.map(recipe =>
                <option key={recipe.id} value={recipe.id}>
                  {recipe.title}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add Ingredient
            </button>
          </div>
        </RecipeForm>
      </section>
    );
  }
}

export default AddIngredient;