import React from 'react';
import {Field} from '../../packages/react-form-composer/src';

const isChecked = target => target.checked;
const RadioButton = ({selected, value, id, name, label }) => (
  <Field
    defaultValue={selected? value: undefined}
    radioValue={value}
    ignoreTargetValueUnless={isChecked}
    name={name}
    label={label}
  >
    {({
      disabled,
      label,
      elementRef,
      radioValue,
      value,
      handleChange,
    }) => {
      const id2 = `${id + name}-${radioValue}`;
      return (
        <div>
          <input
            disabled={disabled}
            id={id2}
            name={name}
            type="radio"
            ref={elementRef}
            value={radioValue}
            checked={radioValue===value}
            onChange={handleChange}
          />
          <label htmlFor={id2}>{label}</label>
        </div>
      );
    }}
  </Field>
);

export default RadioButton;