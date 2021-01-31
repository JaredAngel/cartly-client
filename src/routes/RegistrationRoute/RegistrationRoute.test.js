import React from 'react';
import ReactDOM from 'react-dom';
import RegistrationRoute from './RegistrationRoute';

it('renders RegistrationRoute component', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <RegistrationRoute />, div
  );
  ReactDOM.unmountComponentAtNode(div);
});