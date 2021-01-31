import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import config from '../config';
import './Ingredient.css';
import token from '../services/token-service';

class Ingredient extends React.Component {
  static defaultProps = {
    onDeleteIngredient: () => {},
  };
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault();

    const ingredientId = this.props.id;

    fetch(`${config.API_ENDPOINT}/ingredients/${ingredientId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${token.getAuthToken()}`,
      }
    })
      .then(res => {
        if(!res.ok) {
          return res
            .json()
            .then(e =>
              Promise.reject(e)
            );
        }
      })
      .then(() => {
        this.context.deleteIngredient(ingredientId)
        this.props.onDeleteIngredient(ingredientId)
      })
      .catch(error => {
        console.error({ error });
      });
  }

  // add handler function for 'share'

  render() {
    const { id, title, label } = this.props;

    return (
      <div className='Ingredient'>
        <h2 className='Ingredient__title'>
          <Link to={`/ingredient/${id}`}>
            {title}
          </Link>
        </h2>
        <article className='Ingredient__body group-row'>
          <div className='Ingredient__details item-triple'>
            <p className='Ingredient__label'>
                    Label: {label}
            </p>
          </div>
          <div className='Ingredient__actions item group-column'>
            <button 
              className='Ingredient__delete item'
              type='button'
              onClick={this.handleClickDelete}
            >
              {' '}
              Remove
            </button>
          </div>
        </article>
      </div>
    );
  }
}

export default Ingredient;