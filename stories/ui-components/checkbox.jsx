import React from 'react';
import {Field} from '../../packages/react-form-composer/src';

const isChecked = target => target.checked;

const CheckboxComponent = ({
  disabled,
  id,
  name,
  label,
  elementRef,
  value,
  handleChange
}) => (
  <div>
    <label htmlFor={id + name}>{label}</label>
    <input
      id={id + name}
      disabled={disabled}
      ref={elementRef}
      type="checkbox"
      checked={value}
      onChange={handleChange}
    />
  </div>
);

const Checkbox = props => (
  <Field {...props} component={CheckboxComponent} getTargetValue={isChecked} defaultValue={false}/>
);

export default Checkbox;