import React from 'react';
import { Text } from 'react-form-composer';
import {
  strToNumber,
  numberToStr,
  combineValidation,
  LabelledField
} from './utils';

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
