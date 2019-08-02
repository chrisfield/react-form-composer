import React from 'react';
import Field from '../field';

const isChecked = target => target && target.checked;

export const Checkbox = ({selected = false, ...props}) => (
  <Field
    defaultValue={selected}
    getTargetValue={isChecked}
    {...props}
  >
    {({value, handleChange, elementRef, ...props2})=> (
      <input
        type="checkbox"
        onChange={handleChange}
        checked={value}
        ref={elementRef}
        {...props2}
      />
    )}
  </Field>
);
