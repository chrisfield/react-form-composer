import React from 'react';
import { ValidationMessage } from 'react-form-composer';

const LabelledField = ({label, field, name, children}) => (
  <div>
    <label>
      <div>{label}</div>
      <div>{field}{children}</div>
    </label>
    <ValidationMessage
      name={name} 
      render={
        errorMessage => <p>{errorMessage}</p>
      }
    />
  </div>
);

export default LabelledField;
