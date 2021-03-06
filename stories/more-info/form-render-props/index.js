import { withDocs } from 'storybook-readme';
import readme from './index.md'

import React from 'react';
import {Form, useForm} from '../../../packages/react-form-composer/src';
import {TextInput, NumberInput, Checkbox, RadioButton} from '../../custom-ui-components';

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

const MyForm = () => {  
  return (
    <Form name="myForm" initialValues={{rb2: 'G'}} onSubmit={submitValues} onSubmitSuccess={clearValues}>
      {({handleSubmit}) => (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, marginRight: '2rem' }}>
            <div>
              <TextInput name="fieldOne" label="Field One" required/>
              <NumberInput name="age" label="Age"/>
              <Checkbox name="isAgreed" label="Do you agree?"/>
            </div>
            <div>
              <RadioButton name="rb2" label="Red" value="R" />
              <RadioButton name="rb2" label="Green" value="G" />
              <RadioButton name="rb2" label="Blue" value="B" />
            </div>
            <Button onClick={handleSubmit}/>
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
      )}
    </Form>
  );
};

function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearValues(form) {
  form.updateFields({});
}

export default withDocs(readme, () => <MyForm/>);
