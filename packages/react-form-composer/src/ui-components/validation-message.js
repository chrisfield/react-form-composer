import React from 'react';
import { useScope } from '../scope';
import FormSpy from  '../form-spy';
import getStateValueByPath from '../state-utils/get-field';

export const ValidationMessage = ({name, render, children}) => {
  const fullScopeName = useScope(name);
  const statusSelector = state => {
    const { touched, error: fieldError } = getStateValueByPath(state, `fieldStatus.${fullScopeName}`) || {};
    const error = fieldError || getStateValueByPath(state, `formErrors.${fullScopeName}`);
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
