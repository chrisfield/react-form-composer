import React from 'react';
import {Checkbox} from 'react-form-composer';
import {LabelledField} from './utils';

const CheckboxInput = ({label, ...props}) => (
  <LabelledField
    label={label || props.name}
    field={
      <Checkbox {...props} />
    }
  />
);

export default CheckboxInput;
