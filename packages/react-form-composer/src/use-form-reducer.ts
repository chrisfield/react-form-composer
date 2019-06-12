import { useContext, useRef } from 'react';
import Context from './form-state-context.ts';
import reducer, { initialState } from './reducers/index.ts';
import { initFormState } from './actions.ts';

const useFormReducer = (formName: string) => {
  const [state, dispatch]: any = useContext(Context);
  if (!dispatch) {
    throw "react-form-composer: useFormReducer has no context. Likely it has been called from a component not inside a <FormStateProvider>";
  }
  const formState = state[formName] ? state[formName]: reducer(initialState, initFormState(formName))[formName];
  const formDispatchRef = useRef((action: object) => {
    dispatch({...action, form: formName});
  });
  return [formState, formDispatchRef.current];
};

export default useFormReducer;