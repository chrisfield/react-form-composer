import React from 'react';
import FormSpy from  '../form-spy';
import getStateValueByPath from '../state-utils/get-field';

export const ValidationMessage = ({name}) => {
  const statusSelector = state => getStateValueByPath(state, `fieldStatus.${name}`) || {}
  return <FormSpy selector={statusSelector}>
    {({ touched, error = null }) => {
      return touched ? error: null;
    }}
  </FormSpy>
};
