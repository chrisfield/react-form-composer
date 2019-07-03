import React from 'react';
import { FormSpy } from '../../packages/react-form-composer/src';

const isValidSelector = state => state.formStatus.isValid;
const SaveButton = () => (
  <FormSpy selector={isValidSelector}>
    {(isValid) => (
      <button style={{backgroundColor: isValid? 'green': 'cyan'}} >Save</button>
    )}
  </FormSpy>
);

export default SaveButton;
