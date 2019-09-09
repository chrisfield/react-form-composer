import { withDocs } from 'storybook-readme';
import readme from './index.md'
import React from 'react';
import {TextInput} from '../../custom-ui-components';
import {
  Form,
  Scope,
  useForm
} from '../../../packages/react-form-composer/src';

const TheFormState = () => {
  const {state} = useForm();
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

const Button = () => {
  const {state} = useForm();
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

const Address = () => (
  <>
    <TextInput name="line1" label="line1" required/>
    <TextInput name="line2" label="line2" required/>
    <TextInput name="line3" label="line3"/>
    <TextInput name="postalCode" label="Postcode"/>
    <TextInput name="country" label="Country"/>
  </>
);

const MyForm = () => {  
  return (
    <Form name="myForm" initialValues={{fullName: 'Mr J Smith'}} onSubmit={submitValues} onSubmitSuccess={clearValues} className="my-form">
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, marginRight: '2rem' }}>
          <TextInput name="fullName" label="Full Name" required/>
          <Scope name="addresses">
            <label>Addresses:</label><br/>
            <Scope name="Home">
              <label>Home:</label><br/>
              <Address/>
            </Scope>
            <br/>
            <Scope name="work">
              <label>Work:</label><br/>
              <Address/>
            </Scope>
          </Scope>
          <Button/>
        </div>
        <div style={{
          flex: 2,
          flexDirection: 'column',
          display: 'flex',
          minWidth: '300px'
        }}>
          <TheFormState/> 
        </div>
      </div>
    </Form>
  );
};

export default withDocs(readme, () => <MyForm/>);
