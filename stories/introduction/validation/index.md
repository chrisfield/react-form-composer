# Validation and more

Usernames staring with a/A will trigger a submit error also the form checks the two passwords are equal.
<!-- STORY -->

---
#### Code
```jsx
import React from 'react';
import {FormStateProvider, Form, useForm, useFormReducer, useField} from 'react-form-composer';
import {TextInput} from '../../ui-components';

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

function sameAsPassword(value, values) {
  if (value !== values.password) {
    return "Sorry, the two passwords must match, please reenter."
  }
}

function revalidatePassword2(fieldApi) {
  fieldApi.getField('password2').validate();
}

const MyErrorMessage = () => {
  const {error} = useField('generalMessage');
  return error? <p>{error}</p>: null;  
};

const MyForm = () => {
  return (
    <FormStateProvider>
      <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues}>
        <TextInput name="username" label="Username" required/>
        <TextInput
          name="password"
          label="Password"
          required
          type="password"
          afterUpdate={revalidatePassword2}
        />
        <TextInput 
          name="password2"
          label="Retype password"
          required
          type="password"
          validate={sameAsPassword}
        />
      <MyErrorMessage/>
      <Button/>
    <TheFormState/> 
      </Form>
    </FormStateProvider>
  );
};

function submitValues(values) {
  if (values.username.toUpperCase().startsWith('A')) {
    return {
      username: 'Sorry all usernames staring with "a" or "A" are taken',
      generalMessage: 'Just one error. Please correct and re submit'
    }
  }
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearValues(form) {
  form.updateFields({});
}

export default MyForm;
```