import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import IngredientListNav from './IngredientListNav';

it('renders IngredientListNav component', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <IngredientListNav />
    </BrowserRouter>, div
  );
  ReactDOM.unmountComponentAtNode(div);
});