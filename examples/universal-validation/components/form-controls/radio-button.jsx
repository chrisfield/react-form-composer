import React from 'react';
import { Radio } from 'react-form-composer';
import { LabelledField } from './utils';

const RadioButton = ({label, ...props}) => (
  <LabelledField
    name={props.name}
    label={label || props.value}
    field={
      <Radio {...props}/>
    }
  />
);

export default RadioButton;
