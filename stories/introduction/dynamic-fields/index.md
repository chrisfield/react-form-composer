# Dynamic Fields
This section shows one way to render parts of a form conditionally. When the PartnerField renders its validation is automatically activated. Also note that since the RadioButtons have the same name I have used a Scope to save writing it twice.
<!-- STORY -->

---
#### Code
```jsx
import React from 'react';
import {Form, Scope, useForm, FormSpy, ValidationMessage} from 'react-form-composer';
import {TextInput as Text, RadioButton as Radio} from '../../custom-ui-components';
import { requiredStrWithName } from '../../custom-ui-components/utils';

const TheFormState = () => {
  const {state} = useForm();
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

const Button = (props) => {
  const {state} = useForm();
  return (
    <button {...props} style={{backgroundColor: state.formStatus.isValid? 'green': 'cyan'}} >Submit</button>
  );
};

const required = name => (
  (value) => (
    value && value.trim && value.trim().length > 0 ? undefined: `Please enter a value for ${name.toLowerCase()}`
  )
);

const relationshipStatusSelector = state=>state.fieldValues.relationshipStatus;

const PartnerName = (props) => {
  return (
    <FormSpy selector={relationshipStatusSelector}>
      {relationshipStatus => {
        if (relationshipStatus === "NOT-SINGLE") {
          return (
            <div>
              <Text name="partnerName" validate={requiredStrWithName('partner')} {...props}/>
              <ValidationMessage name="partnerName"/>
            </div>
          );
        }
      }}
    </FormSpy>
  )
};

const MyForm = () => {
  return (
    <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, marginRight: '2rem' }}>
          <div>
            <Text name="firstName" label="First Name" validate={required('first name')}/>
            <ValidationMessage name="firstName"/>
          </div>
          <Scope name="relationshipStatus">
            Are You Single?
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <Radio selected value="SINGLE" label="Yes"/>
              <Radio value="NOT-SINGLE" label="No"/>
            </div>
          </Scope>
          <PartnerName label="Partner Name"/>
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

function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearValues(form) {
  form.updateFields({});
}

export default MyForm;
```
