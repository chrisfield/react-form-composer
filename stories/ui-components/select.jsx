import React from 'react';
import {Field} from '../../packages/react-form-composer/src';
import InputWrapper from './input-wrapper.jsx';
import {requiredStr, combineValidation} from './utils';

const requiredArray = (value, _values, {label}) => {
  return value && (value.length ? undefined: `Please enter a value for ${label.toLowerCase()}`)
};

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

export const SingleSelect = ({required, validate, children, ...props}) => {
  const combinedValidate = required ? combineValidation(requiredStr, validate): validate;
  return (
    <Field defaultValue="" validate={combinedValidate} {...props}>
      {({
        label,
        name,
        value,
        handleChange,
        handleBlur,
        elementRef,
        touched,
        error,
        ...otherProps
      }) => {
        return (
          <InputWrapper {...{name, label, touched, error}}>
            <select
              name={name}
              ref={elementRef}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              {...otherProps}
            >
              {children}
            </select>
          </InputWrapper>
        );
      }}
    </Field>
    );
}

export const MultiSelect = ({required, validate, children, ...props}) => {
  const combinedValidate = required ? combineValidation(requiredArray, validate): validate;
  return (
    <Field validate={combinedValidate} getTargetValue={getSelectedValues} {...props}>
      {({
        label,
        name,
        value,
        handleChange,
        handleBlur,
        elementRef,
        touched,
        error,
        ...otherProps
      }) => {
        return (
          <InputWrapper {...{name, label, touched, error}}>
            <select
              name={name}
              ref={elementRef}
              value={value || []}
              multiple={true}
              onChange={handleChange}
              onBlur={handleBlur}
              {...otherProps}
            >
              {children}
            </select>
          </InputWrapper>
        );
      }}
    </Field>
  );
}

export default Select;