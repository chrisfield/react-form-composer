import {Form, useForm as useFormInternal } from './form';
export {Form}
export const useForm = () => {
  const { name , getState, dispatch} = useFormInternal();
  return {name, state: getState(), dispatch};
};
export {
  initFormState as initFormStateAction,
  updateFields as updateFieldsAction
} from './actions';
export {default as focusOnFirstFieldWithError} from './focus-on-first-field-with-error';
export {default as getStateValueByPath} from './state-utils/get-field';
export {default as setStateValueByPath} from './state-utils/set-field';
export {default as Scope, useScope } from './scope';
export {default as FormStateContext} from './form-state-context';
export {default as FormStateProvider} from './form-state-provider';
export {default as FormContextProvider} from './form-context-provider';
export {default as formReducer} from './reducers';
export {default as Field} from './field';
export {default as FieldArray} from './field-array';
export {default as useFormReducer}  from './use-form-reducer';
export {default as useField} from './use-field';
export {default as FormSpy} from './form-spy';

import {updateField} from './actions';

export const updateFieldAction = (field, value) => (
  {field, ...updateField(value)}
);

export {
  Text,
  TextArea,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
  ValidationMessage
} from './ui-components';