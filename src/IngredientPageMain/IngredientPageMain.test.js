import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import IngredientPageMain from './IngredientPageMain';

it('renders IngredientPageMain component', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <IngredientPageMain />
    </BrowserRouter>, div
  );
  ReactDOM.unmountComponentAtNode(div);
});