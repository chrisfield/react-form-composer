import React, { Fragment, useContext, useRef } from 'react';
import useFormReducer from './use-form-reducer';
import {Context} from './form';

export const Provider = ({ children, ...props }) => {
  return (
    <Context.Provider value={props}>
      {children}
    </Context.Provider>
  );
};

export const useForm = () => {
  const { formApi } = useContext(Context);
  return formApi;
};

const noop = () => (undefined);

const FormReducerRef = ({formReducerRef}) => {
  const formReducer = useFormReducer(useForm().name);
  formReducerRef.current = formReducer;
  return null;
};

const Form = ({
  name,
  children,
}) => {

  const formReducerRef = useRef([]);
  const formApiRef = useRef({
    deregisterField: noop,
    name,
    registerField: noop,
    getState: () => (formReducerRef.current[0]),
    dispatch: (action) => {formReducerRef.current[1](action)}
  });

  return (
    <Provider 
      formApi={formApiRef.current}
    >
      <FormReducerRef formReducerRef={formReducerRef}/>
      <Fragment children={children}/>
    </Provider>
  );
};

export default Form;