# Dynamic Fields
This section shows one way to render parts of a form conditionally. Notice that the when the PartnerField renders its validation is automatically activated.
<!-- STORY -->

---
#### Code
```jsx
import React from 'react';
import {FormStateProvider, Form, useForm, useFormReducer, useField} from '../../../packages/react-form-composer/src';
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
        <div>
          Are You Single?
          <RadioButton name="relationshipStatus" value="SINGLE" label="Yes"/>
          <RadioButton name="relationshipStatus" value="NOT-SINGLE" label="No"/>
        </div>
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
