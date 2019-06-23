import { withDocs } from 'storybook-readme';
import readme from './index.md'

import React from 'react';
import {FormStateProvider, Form, Scope, useForm, useFormReducer, FormSpy} from '../../../packages/react-form-composer/src';
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

const relationshipStatusSelector = state=>state.fieldValues.relationshipStatus;

const PartnerName = (props) => {
  return (
    <FormSpy selector={relationshipStatusSelector}>
      {relationshipStatus => {
        if (relationshipStatus === "NOT-SINGLE") {
          return (
            <TextInput name="partnerName" required {...props}/>
          );
        }
      }}
    </FormSpy>
  )
};

const initialValues = {
  relationshipStatus: 'SINGLE'
}

const MyForm = () => {
  return (
    <FormStateProvider>
      <Form name="myForm" initialValues={initialValues} onSubmit={submitValues} onSubmitSuccess={clearValues}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, marginRight: '2rem' }}>
            <TextInput name="firstName" label="First Name" required/>
            <Scope name="relationshipStatus">
              Are You Single?
              <RadioButton value="SINGLE" label="Yes"/>
              <RadioButton value="NOT-SINGLE" label="No"/>
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
    </FormStateProvider>
  );
};

function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearValues(form) {
  form.updateFields(initialValues);
}

export default withDocs(readme, () => <MyForm/>);
