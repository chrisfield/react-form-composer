import React from 'react';
import {Field} from '../../packages/react-form-composer/src';
import InputWrapper from './input-wrapper.jsx';

const NumberInputComponent = ({
  label,
  disabled,
  name,
  id,
  value,
  handleChange,
  handleBlur,
  elementRef,
  touched,
  error,
  placeholder,
  children
}) => 
{
  return (
    <InputWrapper {...{name, id, label, touched, error}}>
      <input
        id={id + name}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        ref={elementRef}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {children}
    </InputWrapper>
  );
};

const requiredNum = (value, _values, field) => {
  if (value === null || isNaN(value)) {
    return `Please enter a value for ${field.label.toLowerCase()}`;
  }
  return undefined;
};

const number = str => {
  const num = parseInt(str.replace(/[^\d.-]/g, ""), 10);
  if (Number.isNaN(num)) {
    return undefined;
  }
  return num;
};

const addCommas = number => {
  if (number === 0) {
    return '0';
  }
  if (!number) {
    return '';
  }
  return number.toLocaleString();
};


export const getNextCursorPosition = ({element}, value, nextValue) => {
  let cursorPosition = element.selectionStart;
  if (nextValue.length === value.length + 2) { // + 2 is for digit and comma
    cursorPosition++;
  }
  return cursorPosition;
}

export const setCursorPosition = ({element}, cursorPosition) => {
  if (cursorPosition !== undefined && element.setSelectionRange) {
    element.setSelectionRange(cursorPosition, cursorPosition);
  }  
}

export const NumberInput = ({required, ...props}) => {
  return <Field
    component={NumberInputComponent}
    defaultValue={null}
    validate={required? requiredNum: undefined}
    formatFromStore={addCommas}
    formatToStore={number}
    beforeUpdate={getNextCursorPosition}
    afterUpdate={setCursorPosition}
    {...props}
  />
};

export default NumberInput;
