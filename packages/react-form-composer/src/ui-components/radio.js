import React from 'react';
import Field from '../field';
import Scope from '../scope';

export { Scope as RadioGroup };

const isChecked = target => target && target.checked;

export const Radio = ({value: radioValue, selected, ...props}) => (
  <Field
    defaultValue={selected? radioValue: undefined}
    ignoreTargetValueUnless={isChecked}
    {...props}
  >
    {({
      value,
      handleChange,
      handleBlur,
      elementRef,
      touched,
      error,
      ...props2
    })=> (
      <input
        type="radio"
        value={radioValue}
        onChange={handleChange}
        onBlur={handleBlur}
        checked={value === radioValue}
        ref={elementRef}
        {...props2}
      />
    )}
  </Field>
);
