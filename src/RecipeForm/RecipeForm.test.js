import React from 'react';
import ReactDOM from 'react-dom';
import RecipeForm from './RecipeForm';

it('renders RecipeForm component', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <RecipeForm />,
    div);
  ReactDOM.unmountComponentAtNode(div);
});