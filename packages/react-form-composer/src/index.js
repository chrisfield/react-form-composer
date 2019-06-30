import {Form, useForm as useFormInternal } from "./form";
export {Form}
export const useForm = () => {
  const { name } = useFormInternal();
  return {name};
};
export {default as FormContext} from "./form-context";
export {default as Formlet} from "./formlet";
export {
  initFormState as initFormStateAction,
  updateFields as updateFieldsAction
} from "./actions";
export { Scope, useScope } from "./scope";
export {default as FormStateContext} from "./form-state-context";
export {
  default as FormStateProvider,
  SubFormStateProvider
} from "./form-state-provider";
export {default as formReducer} from "./reducers";
export {default as Field} from "./field";
export {default as FieldArray} from "./field-array";
export {default as useFormReducer}  from './use-form-reducer';
export {default as useField} from './use-field';
export {default as FormSpy} from './form-spy';

import {updateField} from "./actions";

export const updateFieldAction = (field, value) => (
  {field, ...updateField(value)}
);