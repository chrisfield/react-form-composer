import React from 'react';
import {Field} from '../../packages/react-form-composer/src';

const isChecked = target => target.checked;

const CheckboxComponent = ({
  id,
  name,
  label,
  elementRef,
  value,
  handleChange,
  touched,
  error,
  handleBlur,
  ...props
}) => (
  <div>
    <label htmlFor={id || name}>{label}</label>
    <input {...props} id={id || name} ref={elementRef} type="checkbox" checked={value} onChange={handleChange} />
  </div>
);

const Checkbox = props => (
  <Field {...props} component={CheckboxComponent} getTargetValue={isChecked} defaultValue={false}/>
);

export default Checkbox;