import React from 'react';
import './RecipeForm.css';

function RecipeForm(props) {
  const { className, ...otherProps } = props;
  return (
    <form
      className={['Recipe-form', className].join(' ')}
      action='#'
      {...otherProps}
    />
  );
}

export default RecipeForm;