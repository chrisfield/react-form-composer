import React from 'react';
import { Text } from '../../packages/react-form-composer/src';
import {combineValidation, requiredStrWithName, LabelledField} from './utils';

const TextInput = ({label, validate, ...props}) => (
  <LabelledField
    name={props.name}
    label={label || props.name}
    field={
      <Text
        validate={props.required ? combineValidation(requiredStrWithName(label || props.name), validate): validate}
        {...props}
      />
    }
  />
);

export default TextInput;