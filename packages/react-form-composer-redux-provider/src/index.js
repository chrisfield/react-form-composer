import React from 'react';
import { ReactReduxContext } from 'react-redux';
import {
  FormStateContext,
  updateFieldsAction as updateFields,
  updateFieldAction as updateField
} from 'react-form-composer';

export const updateFieldsAction = (form, payload) => (
  {form, ...updateFields(payload)}
);

export const updateFieldAction = (form, field, value) => (
  {form, ...updateField(field, value)}
);

const FormStateProvider = ({ children, formReducerNamespace = 'form' }) => {
  return (
    <ReactReduxContext.Consumer>
      { (value) => (
          <FormStateContext.Provider value={[value.store.getState()[formReducerNamespace], value.store.dispatch]}>
            {children}
          </FormStateContext.Provider>
        )
      }
    </ReactReduxContext.Consumer>
  );
};

export default FormStateProvider;