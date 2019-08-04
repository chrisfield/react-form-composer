export {default as requiredStrWithName} from './required-str-with-name';
export {default as requiredNumberWithName} from './required-number-with-name';
export {default as strToNumber} from './str-to-number';
export {default as numberToStr} from './number-to-str';
export {default as combineValidation} from './combine-validation';
export {default as LabelledField} from './labelled-field';

export const upper = value => ((value && value.toUpperCase())||'');
export const lower = value => ((value && value.toLowerCase())||'');

export const maxLength = length => (
  value => (value && value.trim && value.trim().length > length ? `Please enter max of ${length} characters`: undefined)
);
