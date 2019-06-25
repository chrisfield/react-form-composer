import React from 'react';
import {Field} from '../../packages/react-form-composer/src';
import InputWrapper from './input-wrapper.jsx';
import {requiredStr, combineValidation} from './utils';

export const TextInput = ({required, validate, ...props}) => {
  const combinedValidate = required ? combineValidation(requiredStr, validate): validate;
  return <Field
    validate={combinedValidate}
    {...props}
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
      ...props}) => 
    (
      <InputWrapper {...{name, label, touched, error}}>
        <input
          id={name}
          ref={elementRef}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          {...props}
        />
        {children}
      </InputWrapper>
    )}
  </Field>
}

export default TextInput;