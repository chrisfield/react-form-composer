import React from 'react';
import Field from '../field';
import FormSpy from  '../form-spy';
import Scope from '../scope';
import getStateValueByPath from '../state-utils/get-field';

export { Scope as RadioGroup };

export const Text = props => (
  <Field component="input" {...props}/>
);

export const TextArea = props => (
  <Field component="textarea" {...props}/>
);

const getSelectedValues = target => {
  const options = target.options;
  const result = [];
  if (options) {
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
      if (option.selected) {
        result.push(option.value);
      }
    }
  }
  return result;
};

export const Select = ({multiple, ...props}) => {
  if (multiple) {
    return <MultiSelect {...props}/>
  }
  return <SingleSelect {...props}/>
}

const SingleSelect = props => (
  <Field component="select" {...props}/>
);

const MultiSelect = props => (
  <Field component="select" multiple getTargetValue={getSelectedValues} {...props}/>
);

export const ValidationMessage = ({name}) => {
  const statusSelector = state => getStateValueByPath(state, `fieldStatus.${name}`) || {}
  return <FormSpy selector={statusSelector}>
    {({ touched, error = null }) => {
      return touched ? error: null;
    }}
  </FormSpy>
};

const isChecked = target => target && target.checked;

export const Radio = ({value: radioValue, selected, ...props}) => (
  <Field
    defaultValue={selected? radioValue: undefined}
    ignoreTargetValueUnless={isChecked}
    {...props}
  >
    {({value, handleChange, elementRef, ...props2})=> (
      <input
        type="radio"
        value={radioValue}
        onChange={handleChange}
        checked={value === radioValue}
        ref={elementRef}
        {...props2}
      />
    )}
  </Field>
);

export const Checkbox = ({selected, ...props}) => (
  <Field
    defaultValue={selected}
    getTargetValue={isChecked}
    {...props}
  >
    {({value, handleChange, elementRef, ...props2})=> (
      <input
        type="checkbox"
        onChange={handleChange}
        checked={value}
        ref={elementRef}
        {...props2}
      />
    )}
  </Field>
);
