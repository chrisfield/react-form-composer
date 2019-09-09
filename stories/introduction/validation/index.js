import { withDocs } from 'storybook-readme';
import readme from './index.md'

import React from 'react';
import {
  Form,
  useForm,
  useField
} from '../../../packages/react-form-composer/src';

import { TextInput as Text} from '../../custom-ui-components';

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

function sameAsPassword(value, password) {
  // console.log(`sameAsPassword(value, values)`, value, values);
  if (value !== password) {
    return "Sorry, the two passwords must match, please reenter."
  }
}

function revalidatePassword2(fieldApi) {
  console.log('revalpw2', fieldApi);
  fieldApi.getField('password2').validate();
}

const MyErrorMessage = () => {
  const {error} = useField('generalMessage');
  return error? <p>{error}</p>: null;  
};

const MyForm = () => {
  return (
    <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, marginRight: '2rem' }}>
          <div>
            <Text name="username" label="Username" required/>
            <Text
              name="password"
              required
              type="password"
              afterUpdate={revalidatePassword2}
            />
            <Text
              name="password2"
              required
              type="password"
              spy="password"
              validate={sameAsPassword}
            />
          </div>
          <MyErrorMessage/>
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

export default withDocs(readme, () => <MyForm/>);
