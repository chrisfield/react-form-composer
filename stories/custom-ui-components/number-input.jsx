import React from 'react';
import { Text } from '../../packages/react-form-composer/src';
import {combineValidation, LabelledField} from './utils';

const requiredNumWithName = name => (
  (value) => {
    if (value === null || isNaN(value)) {
      return `Please enter a value for ${name.toLowerCase()}`;
    }
      return undefined;
  }
);

const strToNumber = str => {
  const num = parseInt(str.replace(/[^\d.-]/g, ""), 10);
  if (Number.isNaN(num)) {
    return undefined;
  }
  return num;
};

const numberToStr = number => {
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

const NumberInput = ({label, validate, ...props}) => (
  <LabelledField
    name={props.name}
    label={label || props.name}
    field={
      <Text
        defaultValue={null}
        formatFromStore={numberToStr}
        formatToStore={strToNumber}
        beforeUpdate={getNextCursorPosition}
        afterUpdate={setCursorPosition}
        validate={props.required ? combineValidation(requiredNumWithName(label || props.name), validate): validate}
        {...props}
      />
    }
  />
);

export default NumberInput;
