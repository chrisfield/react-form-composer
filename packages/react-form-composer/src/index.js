export {default as Form, useForm} from './form';
export {default as formReducer} from './reducers';
export {default as Field} from './field';
export {default as FieldArray} from './field-array';
export { Text } from './ui-components/text';
export { TextArea } from './ui-components/text-area';
export { Select } from './ui-components/select';
export { Checkbox } from './ui-components/checkbox';
export { RadioGroup, Radio } from './ui-components/radio';
export { ValidationMessage } from './ui-components/validation-message';
export {default as FormSpy} from './form-spy';
export {default as Scope} from './scope';
export {default as useField} from './use-field';
export {default as focusOnFirstFieldWithError} from './focus-on-first-field-with-error';
export {default as getStateValueByPath} from './state-utils/get-field';
export {default as setStateValueByPath} from './state-utils/set-field';

export {
  initFormState as initFormStateAction,
  updateFields as updateFieldsAction
} from './actions';

import {updateField} from './actions';
export const updateFieldAction = (field, value) => (
  {field, ...updateField(value)}
);
