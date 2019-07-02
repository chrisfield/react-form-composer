import React from 'react';
import {Field} from '../../packages/react-form-composer/src';
import InputWrapper from './input-wrapper.jsx';
import {requiredStr, combineValidation} from './utils';

export const TextInput = ({
  defaultValue="",
  required,
  validate,
  name,
  id="",
  placeholder,
  label
}) => {
  const combinedValidate = required ? combineValidation(requiredStr, validate): validate;
  return <Field
    name={name}
    defaultValue={defaultValue}
    validate={combinedValidate}
    label={label}
  >
    {({
      label,
      name,
      value,
      handleChange,
      handleBlur,
      elementRef,
      touched,
      error,
      children
    }) => 
    (
      <InputWrapper {...{name, id, label, touched, error}}>
        <input
          id={id + name}
          name={name}
          ref={elementRef}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
        />
        {children}
      </InputWrapper>
    )}
  </Field>
}

export default TextInput;