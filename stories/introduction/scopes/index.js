import { withDocs } from 'storybook-readme';
import readme from './index.md'
import React from 'react';
import {TextInput} from '../../ui-components';
import { 
  FormStateProvider,
  Form,
  Scope,
  useForm,
  useFormReducer
} from '../../../packages/react-form-composer/src';

const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

const Button = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <button style={{backgroundColor: state.formStatus.isValid? 'green': 'cyan'}} >Submit</button>
  );
};

const submitValues = (values) => {
  alert(`You submitted: ${JSON.stringify(values, undefined, 2)}`);
};

const clearValues = (form) => {
  form.updateFields({});
};

const MyForm = () => {  
  return (
    <FormStateProvider>
      <Form name="myForm" initialValues={{hobbies:[{}]}} onSubmit={submitValues} onSubmitSuccess={clearValues} className="my-form">
        <TextInput name="fullName" label="Full Name"/>
        <Scope name="address">
          <label>Address:</label><br/>
          <TextInput name="line1" label=""/>
          <TextInput name="line2" label=""/>
          <TextInput name="line3" label=""/>
          <TextInput name="postalCode" label="Postcode"/>
          <TextInput name="country" label="Country"/>
        </Scope>
        <Button/>
        <TheFormState />
      </Form>
    </FormStateProvider>
  );
};

export default withDocs(readme, () => <MyForm/>);
