import {useRef} from 'react';
import { useForm } from './form';
import { useScope } from './scope';
import useFormReducer from './use-form-reducer';
import getField from './state-utils/get-field';


const defaultStatus = {};
const useField = (fieldName) => {
  const { name: formName } = useForm();
  const { name: scopeName } = useScope();
  const fullFieldName = scopeName ? `${scopeName}.${fieldName}`: fieldName;
  const [formState, formDispatch] = useFormReducer(formName);

  const value = getField(formState.fieldValues, fullFieldName);
  const status = getField(formState.fieldStatus, fullFieldName) || defaultStatus;
  const touched = status.touched;
  const customProps = status.customProps;
  const error = status.error ? status.error : getField(formState.formErrors, fullFieldName);

  const dispatchRef = useRef((action) => {
    formDispatch({field: fullFieldName, ...action });
  });
    
  return {value, touched, error, dispatch: dispatchRef.current, customProps};
};

export default useField;