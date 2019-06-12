import { useForm } from './form.tsx';
import useFormReducer from './use-form-reducer.ts';
import getField from './state-utils/get-field.ts';

const useFieldArray = (fieldArrayName: string) => {
  const { name:formName } = useForm();
  const [formState, formDispatch] = useFormReducer(formName);

  const fields = getField(formState.fieldValues, fieldArrayName);

  const dispatch = (action: object) => {
    formDispatch({fieldArray: fieldArrayName, ...action });
  };
  return {fields, dispatch};
};

export default useFieldArray;