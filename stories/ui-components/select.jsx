import React from 'react';
import { Select } from '../../packages/react-form-composer/src';
import {combineValidation, requiredStrWithName, LabelledField} from './utils';

const SelectInput = ({label, validate, ...props}) => (
  <LabelledField
    name={props.name}
    label={label || props.name}
    field={
      <Select
        validate={props.required ? combineValidation(requiredStrWithName(label || props.name), validate): validate}
        {...props}
      />
    }
  />
);

export default SelectInput;