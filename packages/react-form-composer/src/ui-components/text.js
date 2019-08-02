import React from 'react';
import Field from '../field';

const stringToNumber = str => {
  if (str === '') {
    return undefined;
  }
  const num = Number(str)
  if (Number.isNaN(num)) {
    return undefined;
  }
  return num;
};

const numberToString = number => {
  if (number === 0) {
    return '0';
  }
  if (!number) {
    return '';
  }
  return number.toString();
};

export const Text = props => {
  const numberProps = {};
  if (props.type === 'number') {
    numberProps.formatToStore = stringToNumber
    numberProps.formatFromStore = numberToString
  }
  return <Field component="input" {...numberProps} {...props}/>
};
