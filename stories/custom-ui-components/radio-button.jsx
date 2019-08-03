import React from 'react';
import { Radio } from '../../packages/react-form-composer/src';
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
