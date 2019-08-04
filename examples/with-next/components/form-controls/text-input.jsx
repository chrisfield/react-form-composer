import React from 'react';
import { Text } from 'react-form-composer';
import {combineValidation, requiredStrWithName, LabelledField} from './utils';

const TextInput = ({label, children, validate, ...props}) => (
  <LabelledField
    name={props.name}
    label={label || props.name}
    field={
      <Text
        validate={props.required ? combineValidation(requiredStrWithName(label || props.name), validate): validate}
        {...props}
      />
    }
  >
    {children}
  </LabelledField>
);

export default TextInput;