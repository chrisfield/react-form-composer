import { withDocs } from 'storybook-readme';
import readme from './README.md'

import React from 'react';
import {FormStateProvider, Form, useForm, useFormReducer, Field} from '../../packages/react-form-composer/src';

const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

const requiredStr = (value, _values, {label}) => {
  return value && value.trim && value.trim().length > 0 ? undefined: `Please enter a value for ${label.toLowerCase()}`
};

const MyForm = () => {  
  return (
    <FormStateProvider>
      <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, marginRight: '2rem' }}>
            <div>
              <label>First name: <Field name="firstName" component="input"/></label>
            </div>
            <div>
              <Field name="lastName" validate={requiredStr} label="Last Name:">
                {({name, value, error, touched, handleChange, handleBlur, label}) => (
                  <div>
                    <label htmlFor={name}>{label}</label>
                    <input id={name} value={value} onChange={handleChange} onBlur={handleBlur}/>
                    {touched && error && <p>{error}</p>}
                  </div>
                )}
              </Field>
            </div>            
            <button>Submit</button>
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
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearValues(form) {
  form.updateFields({});
}

export default withDocs(readme, () => <MyForm/>);
