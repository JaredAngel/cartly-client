import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Ingredient from './Ingredient';

it('renders Ingredient component', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Ingredient />
    </BrowserRouter>, div 
  );
  ReactDOM.unmountComponentAtNode(div);
});