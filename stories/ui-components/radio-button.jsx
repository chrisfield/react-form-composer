import React from 'react';
import {Field} from '../../packages/react-form-composer/src';

const isChecked = target => target.checked;
const RadioButton = ({selected, value, id, name, ...props}) => (
  <Field
    defaultValue={selected? value: undefined}
    radioValue={value}
    ignoreTargetValueUnless={isChecked}
    name={name}
    {...props}
  >
    {props2 => {
      const id2 = `${id || name}-${props2.radioValue}`;
      return (
        <div>
          <input
            id={id2}
            type="radio"
            ref={props2.elementRef}
            name={name}
            value={props2.radioValue}
            checked={props2.radioValue===props2.value}
            onChange={props2.handleChange}
          />
          <label htmlFor={id2}>{props2.label}</label>
        </div>
      );
    }}
  </Field>
);

export default RadioButton;