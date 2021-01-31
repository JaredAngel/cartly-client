import React from 'react';
import ReactDOM from 'react-dom';
import IngredientPageNav from './IngredientPageNav';

it('renders IngredientPageNav component', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <IngredientPageNav />, div
  );
  ReactDOM.unmountComponentAtNode(div);
});