import React from 'react';
import FormStateContext from './form-state-context';

const FormStateProvider = ({ state, dispatch, children, formReducerNamespace = 'form' }) => {
  return (
    <FormStateContext.Provider value={[state[formReducerNamespace], dispatch]} children={children}/>
  );
};

const reduxFormStateProvider = (connect) => {
  return (connect(state=>({state}), dispatch=>({dispatch}))(FormStateProvider))
};

export default reduxFormStateProvider;
