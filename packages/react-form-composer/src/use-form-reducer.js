import { useContext, useRef } from 'react';
import Context from './form-state-context';
import reducer, { initialState } from './reducers';
import { initFormState } from './actions';

const getState = state => state; 

const useFormReducer = (formName, selector = getState) => {
  const [state, dispatch, parentState, parentDispatch] = useContext(Context);
  if (!dispatch) {
    throw "react-form-composer: useFormReducer has no context. Likely it has been called from a component not inside a <FormStateProvider>";
  }
  const formState = state[formName] ? state[formName]: reducer(initialState, initFormState(formName))[formName];
  const formDispatchRef = useRef((action) => {
    dispatch({...action, form: formName});
  });
  return [selector(formState), formDispatchRef.current, parentState, parentDispatch];
};

export default useFormReducer;