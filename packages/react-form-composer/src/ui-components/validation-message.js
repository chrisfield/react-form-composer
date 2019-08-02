import React from 'react';
import FormSpy from  '../form-spy';
import getStateValueByPath from '../state-utils/get-field';

export const ValidationMessage = ({name}) => {
  const statusSelector = state => {
    const { touched, error: fieldError } = getStateValueByPath(state, `fieldStatus.${name}`) || {};
    const error = fieldError || getStateValueByPath(state, `formErrors.${name}`);
    return { touched, error };
  }
  return <FormSpy selector={statusSelector}>
    {({ touched, error = null }) => {
      return touched ? error: null;
    }}
  </FormSpy>
};
