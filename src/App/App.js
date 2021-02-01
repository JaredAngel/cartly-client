import React from 'react';
import {Route, Link} from 'react-router-dom';
import IngredientListNav from '../IngredientListNav/IngredientListNav';
import IngredientPageNav from '../IngredientPageNav/IngredientPageNav';
import IngredientListMain from '../IngredientListMain/IngredientListMain';
import IngredientPageMain from '../IngredientPageMain/IngredientPageMain';
import AddRecipe from '../AddRecipe/AddRecipe';
import AddIngredient from '../AddIngredient/AddIngredient';
import ApiContext from '../ApiContext';
import config from '../config';
import token from '../services/token-service';
import './App.css';
import TokenService from '../services/token-service';

class App extends React.Component {
  state = {
    recipes: [],
    ingredients: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/ingredients`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `bearer ${token.getAuthToken()}`,
        }
      }),
      fetch(`${config.API_ENDPOINT}/recipes`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `bearer ${token.getAuthToken()}`,
        }
      })
    ])
      .then(([ingredientsRes, recipesRes]) => {
        if(!ingredientsRes.ok) {
          return ingredientsRes
            .json()
            .then(e =>
              Promise.reject(e)
            );
        }
        if(!recipesRes.ok) {
          return recipesRes
            .json()
            .then(e =>
              Promise.reject(e)
            );
        }
        return Promise.all([
          ingredientsRes.json(),
          recipesRes.json(),
        ]);
      })
      .then(([ingredients, recipes]) => {
        this.setState({ ingredients, recipes })
      })
      .catch(error => {
        console.error({ error })
      });
  }

  handleAddRecipe = recipe => {
    this.setState({
      recipes: [
        ...this.state.recipes,
        recipe
      ]
    });
  }

  handleAddIngredient = ingredient => {
    this.setState({
      ingredients: [
        ...this.state.ingredients,
        ingredient
      ]
    });
  }

  handleDeleteIngredient = ingredientId => {
    this.setState({
      ingredients: this.state.ingredients.filter(ingredient => ingredient.id !== ingredientId)
    });
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/recipe/:recipeId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={IngredientListNav}
          />
        ))}
        <Route
          path='/ingredient/:ingredientId'
          component={IngredientPageNav}
        />
        <Route
          path='/add-recipe'
          component={IngredientPageNav}
        />
        <Route
          path='/add-ingredient'
          component={IngredientPageNav}
        />
      </>
    );
  }

  logout = () => {
    TokenService.clearAuthToken();
    this.props.logout();
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/recipe/:recipeId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={IngredientListMain}
          />
        ))}
        <Route
          path='/ingredient/:ingredientId'
          component={IngredientPageMain}
        />
        <Route
          path='/add-recipe'
          component={AddRecipe}
        />
        <Route
          path='/add-ingredient'
          component={AddIngredient}
        />
      </>
    );
  }

  render() {
    const value = {
      ingredients: this.state.ingredients,
      recipes: this.state.recipes,
      addRecipe: this.handleAddRecipe,
      addIngredient: this.handleAddIngredient,
      deleteIngredient: this.handleDeleteIngredient,
    };

    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
        <nav className='App__nav'>
          {this.renderNavRoutes()}
        </nav>
        <header className='App__header group-row'>
          <h1 className='item'>
            <Link to='/'>Cartly</Link>
            {' '}
          </h1>
          {/* <div> */}
          <Link to='/' onClick={this.logout} className='logout-link'>logout</Link>
          {/* </div>  */}
        </header>
        <main className='App__main'>
          {this.renderMainRoutes()}
        </main>
      </div>
      </ApiContext.Provider>
    );
  }
}

export default App;