import React from 'react';
import Field from '../field';

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
  <Field component="select" multiple getTargetValue={getSelectedValues} defaultValue={[]} {...props}/>
);
