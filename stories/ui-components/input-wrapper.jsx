import React from 'react';

const InputWrapper = ({label, id, name, touched, error, children}) => (
  <div>
    <label htmlFor={id || name}>{label || name}</label>
    {children}
    {touched && error && <p>{error}</p>}
  </div>
);

export default InputWrapper;