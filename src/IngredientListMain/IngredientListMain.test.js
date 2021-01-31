import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import IngredientListMain from './IngredientListMain';

it('renders IngredientListMain component', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <IngredientListMain />
    </BrowserRouter>, div
  );
  ReactDOM.unmountComponentAtNode(div);
});