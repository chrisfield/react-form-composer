import React from 'react';
import { getStateValueByPath, FormSpy } from '../../packages/react-form-composer/src';

const FormStateSelector = ({path, transform=data=>data}) => {
  const selector = path? (state) => getStateValueByPath(state, path): state => state;
  return (
    <FormSpy selector={selector}>
      {(selectedState) => (
        <pre>
          <code style={{fontSize: '60%'}}>{JSON.stringify(transform(selectedState), null, 2)}</code>
        </pre>
      )}
    </FormSpy>
  );
};

export default FormStateSelector;