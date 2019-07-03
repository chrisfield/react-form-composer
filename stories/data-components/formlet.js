import React from 'react';
import {
  FormStateProvider,
  useForm,
  Form
} from '../../packages/react-form-composer/src';

const Formlet = (props) => {
  const {name: formName, state: formState} = useForm();
  return (
    <div>
      <FormStateProvider initialState={{[formName]: formState}}>
        <Form
          name={formName}
          {...props}
        />
      </FormStateProvider>
    </div>
  );  
};

export default Formlet;
