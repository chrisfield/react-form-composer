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
  label,
  disabled,
  type,
  afterUpdate
}) => {
  const combinedValidate = required ? combineValidation(requiredStr, validate): validate;
  return <Field
    name={name}
    defaultValue={defaultValue}
    validate={combinedValidate}
    label={label}
    type={type}
    afterUpdate={afterUpdate}
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
      children,
      ...fieldProps
    }) => 
    (
      <InputWrapper {...{name, id, label, touched, error}}>
        <input
          id={id + name}
          name={name}
          ref={elementRef}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          {...fieldProps}
        />
        {children}
      </InputWrapper>
    )}
  </Field>
}

export default TextInput;