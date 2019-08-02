import React from 'react';
import FormSpy from  '../form-spy';
import getStateValueByPath from '../state-utils/get-field';

export const ValidationMessage = ({name, render, children}) => {
  const statusSelector = state => {
    const { touched, error: fieldError } = getStateValueByPath(state, `fieldStatus.${name}`) || {};
    const error = fieldError || getStateValueByPath(state, `formErrors.${name}`);
    return { touched, error };
  }
  return <FormSpy selector={statusSelector}>
    {({ touched, error = null }) => {
      if (!touched || !error) {
        return null;
      }
      if (render) {
        return render(error);
      }      
      if ( typeof children === 'function') {
        return children(error); 
      }
      return error;
    }}
  </FormSpy>
};
