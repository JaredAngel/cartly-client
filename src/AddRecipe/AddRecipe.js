import React from 'react';
import RecipeForm from '../RecipeForm/RecipeForm';
import ApiContext from '../ApiContext';
import config from '../config';
import token from '../services/token-service';
//import './AddRecipe.css'

class AddRecipe extends React.Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  };
  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault();
    const recipe = {
      title: e.target['recipe-title'].value,
    };

    fetch(`${config.API_ENDPOINT}/recipes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${token.getAuthToken()}`,
      },
      body: JSON.stringify(recipe),
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
      .then(recipe => {
        this.context.addRecipe(recipe)
        this.props.history.push(`/recipe/${recipe.id}`)
      })
      .catch(error => {
        console.error({ error })
      });
  }

  render() {
    return (
      <section className='AddRecipe'>
        <h2>Save a Recipe</h2>
        <RecipeForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='recipe-title-input'>
              Title
            </label>
            <input 
              type='text'
              id='recipe-title-input'
              name='recipe-title'
              placeholder='Pizza...'
              required
            />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add Recipe
            </button>
          </div>
        </RecipeForm>
      </section>
    )
  }
}

export default AddRecipe;