import React from 'react';
import {
  useForm,
  Form
} from '../../packages/react-form-composer/src';

const Formlet = (props) => {
  const {state: formState} = useForm();
  return (
    <div>
      <Form
        initialValues={formState.fieldValues}
        {...props}
      />
    </div>
  );  
};

export default Formlet;
