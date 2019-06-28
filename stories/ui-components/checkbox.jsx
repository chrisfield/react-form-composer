import React from 'react';
import {Field} from '../../packages/react-form-composer/src';

const isChecked = target => target.checked;

const CheckboxComponent = props => (
  <div>
    <label htmlFor={props.name}>{props.label}</label>
    <input id={props.name} ref={props.elementRef} type="checkbox" checked={props.value} onChange={props.handleChange}/>  
  </div>
);

const Checkbox = props => (
  <Field component={CheckboxComponent} getTargetValue={isChecked} defaultValue={false} {...props} />
);

export default Checkbox;