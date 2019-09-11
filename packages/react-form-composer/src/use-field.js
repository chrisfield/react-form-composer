import { useRef } from 'react'; 
import { useForm } from './form';
import { useScope } from './scope';
import getField from './state-utils/get-field';


const defaultStatus = {};
const useField = (fieldName = '', spy) => {
  const formApi = useForm();
  const {state, dispatch} = formApi;
  const fullFieldName = useScope(fieldName);
  const value = getField(state.fieldValues, fullFieldName);
  const status = getField(state.fieldStatus, fullFieldName) || defaultStatus;
  const { touched, customProps } = status;
  const error = status.error ? status.error : getField(state.formErrors, fullFieldName);

  const dispatchRef = useRef((action) => {
    dispatch({field: fullFieldName, ...action });
  });

  let spyValue;
  if (typeof spy === 'string') {
    spyValue = getField(state.fieldValues, spy);
  } else if (typeof spy === 'function') {
    spyValue = spy(state);
  }
    
  return {value, spyValue, touched, error, dispatch: dispatchRef.current, customProps, formApi};
};

export default useField;