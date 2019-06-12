import {useRef} from 'react';
import { useForm } from './form.tsx';
import useFormReducer from './use-form-reducer.ts';
import getField from './state-utils/get-field.ts';


const defaultStatus = {};
const useField = (fieldName: string) => {
  const { name: formName } = useForm();
  const [formState, formDispatch] = useFormReducer(formName);

  const value = getField(formState.fieldValues, fieldName);
  const status = getField(formState.fieldStatus, fieldName) || defaultStatus;
  const touched = status.touched;
  const customProps = status.customProps;
  const error = status.error ? status.error : getField(formState.formErrors, fieldName);

  const dispatchRef = useRef((action: object) => {
    formDispatch({field: fieldName, ...action });
  });
    
  return {value, touched, error, dispatch: dispatchRef.current, customProps, isResetFieldsDue: formState.formStatus.isResetFieldsDue};
};

export default useField;