import {Form, useForm as useFormInternal } from "./form.tsx";
export {Form}
export const useForm = () => {
  const { name } = useFormInternal();
  return {name};
};

export {
  initFormState as initFormStateAction,
  updateFields as updateFieldsAction
} from "./actions.ts";

export {default as FormStateContext} from "./form-state-context.ts";
export {default as FormStateProvider} from "./form-state-provider.tsx";
export {default as formReducer} from "./reducers/index.ts";
export {default as Field} from "./field.tsx";
export {default as FieldArray} from "./field-array.tsx";
export {default as SubmissionError} from "./submission-error.ts";
export {default as useFormReducer}  from './use-form-reducer.ts';
export {default as useField} from './use-field.ts';
export {default as useFieldArray} from './use-field-array.ts';

import {updateField} from "./actions.ts";

export const updateFieldAction = (field: string, value: any) => (
  {field, ...updateField(value)}
);