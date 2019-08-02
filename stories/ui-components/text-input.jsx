import React from 'react';
import { Text, ValidationMessage } from '../../packages/react-form-composer/src';
import {combineValidation} from './utils';

const requiredStr = label => (
  (value) => (
    value && value.trim && value.trim().length > 0 ? undefined: `Please enter a value for ${label.toLowerCase()}`
  )
);

const TextInput = ({label, validate, ...props}) => (
  <div>
    <label>
      {label || props.name}:
      <Text validate={props.required ? combineValidation(requiredStr(label || props.name), validate): validate} {...props}/>
    </label>
    <ValidationMessage name={props.name}/>
  </div>
);

export default TextInput;