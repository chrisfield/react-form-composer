import React, { useReducer, useContext } from 'react';
import { Context } from './form-state-context'; 
import reducer, { initialState as defaultInitialState} from './reducers';
import { initFormState } from './actions';
import { useForm } from './form';

const FormStateProvider = ({ initialState = defaultInitialState, children }) => {
  const stateAndDispatchInArray = useReducer(reducer, initialState);
  return (
    <Context.Provider value={stateAndDispatchInArray}>
      {children}
    </Context.Provider>
  );
};

export const SubFormStateProvider = ({ children}) => {
  const [parentState, parentDispatch] = useContext(Context);
  const {name: formName} = useForm();
  const initialState = reducer(undefined, initFormState(formName,
    {fieldValues: {todoList: [parentState[formName].fieldValues.todoList[0]]}}));

  const [state, dispatch] = useReducer(reducer, initialState);
  const parentFormDispatch = action => {
    parentDispatch({form: formName, ...action})
  };
  return (
    <Context.Provider value={[state, dispatch, parentState, parentFormDispatch]}>
      {children}
    </Context.Provider>
  );
};

export default FormStateProvider;