import { withDocs } from 'storybook-readme';
import readme from './index.md'

import React from 'react';
import {
  FormStateProvider,
  Form,
  useForm,
  useFormReducer,
  useField
} from '../../../packages/react-form-composer/src';

import TextInput from '../../ui-components/text-input';

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
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, marginRight: '2rem' }}>
            <div>
              <TextInput name="username" label="Username" required/>
              <TextInput
                name="password"
                required
                type="password"
                afterUpdate={revalidatePassword2}
              />
              <TextInput
                name="password2"
                required
                type="password"
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

export default withDocs(readme, () => <MyForm/>);
