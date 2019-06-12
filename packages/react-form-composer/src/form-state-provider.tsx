import React, { useReducer, ReactNode } from 'react';
import { Context } from './form-state-context.ts'; 
import reducer, { initialState as defaultInitialState} from './reducers/index.ts';

type FormStateProviderProps = {
  initialState: object,
  children: ReactNode
};

const FormStateProvider = ({ initialState = defaultInitialState, children}: FormStateProviderProps) => {
  const stateAndDispatchInArray: any = useReducer(reducer, initialState);
  return (
    <Context.Provider value={stateAndDispatchInArray}>
      {children}
    </Context.Provider>
  );
};

export default FormStateProvider;