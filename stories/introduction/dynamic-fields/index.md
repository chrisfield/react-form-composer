# Dynamic Fields
This section shows one way to render parts of a form conditionally. When the PartnerField renders its validation is automatically activated. Also note that since the RadioButtons have the same name I have used a Scope to save writing it twice.
<!-- STORY -->

---
#### Code
```jsx
import React from 'react';
import {FormStateProvider, Form, Scope, useForm, useFormReducer, useField} from 'react-form-composer';
import {TextInput, RadioButton} from '../../ui-components';

const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

const Button = (props) => {
  const [state] = useFormReducer(useForm().name);
  return (
    <button {...props} style={{backgroundColor: state.formStatus.isValid? 'green': 'cyan'}} >Submit</button>
  );
};

const PartnerName = (props) => {
  const relationshipStatus = useField('relationshipStatus').value;
  if (relationshipStatus === "NOT-SINGLE") {
    return <TextInput name="partnerName" required {...props}/>
  }
  return null;
}

const initialValues = {
  relationshipStatus: 'SINGLE'
}

const MyForm = () => {
  return (
    <FormStateProvider>
      <Form name="myForm" initialValues={initialValues} onSubmit={submitValues} onSubmitSuccess={clearValues}>
        <TextInput name="firstName" label="First Name" required/>
        <Scope name="relationshipStatus">
          Are You Single?
          <RadioButton value="SINGLE" label="Yes"/>
          <RadioButton value="NOT-SINGLE" label="No"/>
        </Scope>
        <PartnerName label="Partner Name"/>
        <Button/>
        <TheFormState/> 
      </Form>
    </FormStateProvider>
  );
};

function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearValues(form) {
  form.updateFields(initialValues);
}

export default MyForm;
```