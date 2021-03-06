import React from 'react';
import { ValidationMessage } from '../../../packages/react-form-composer/src';

const LabelledField = ({label, field, name}) => (
  <div>
    <label>
      <div>{label}</div>
      <div>{field}</div>
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
