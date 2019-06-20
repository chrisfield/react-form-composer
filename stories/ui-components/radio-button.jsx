import React from 'react';
import {Field} from '../../packages/react-form-composer/src';

const isChecked = target => target.checked;
  
const RadioButtonComponent = props => {
  const id = `${props.name}-${props.radioValue}`;
  return (
    <div>
      <input id={id} type="radio" ref={props.elementRef} name={props.name} value={props.radioValue} checked={props.radioValue===props.value} onChange={props.handleChange}/>
      <label htmlFor={id}>{props.label}</label>
    </div>
  );
};

const RadioButton = ({value, ...props}) => (
  <Field
    component={RadioButtonComponent}
    radioValue={value}
    ignoreTargetValueUnless={isChecked}
    {...props}
  />
);

export default RadioButton;