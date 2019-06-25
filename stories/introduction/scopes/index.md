# Scopes

The `Scope` component takes a prop called `name`. The name provided will automatically be used to prefix any child `Field` names. The example below uses Scopes to group address fields:

<!-- STORY -->

---
#### Code
```jsx
import React from 'react';
import {TextInput} from '../../ui-components';
import { 
  FormStateProvider,
  Form,
  Scope,
  useForm,
  useFormReducer
} from 'react-form-composer';

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
      <Form name="myForm" initialValues={{fullName: 'Mr J Smith'}} onSubmit={submitValues} onSubmitSuccess={clearValues} className="my-form">
        <TextInput name="fullName" label="Full Name" required/>
        <Scope name="address">
          <label>Address:</label><br/>
          <TextInput name="line1" label="line1" required/>
          <TextInput name="line2" label="line2" required/>
          <TextInput name="line3" label="line3"/>
          <TextInput name="postalCode" label="Postcode"/>
          <TextInput name="country" label="Country"/>
        </Scope>
        <Button/>
        <TheFormState />
      </Form>
    </FormStateProvider>
  );
};


export default myForm;
```