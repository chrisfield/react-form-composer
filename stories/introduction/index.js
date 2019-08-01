import { withDocs } from 'storybook-readme';
import readme from './README.md'

import React from 'react';
import {
  FormStateProvider,
  Form,
  FormSpy,
  useForm,
  useFormReducer,
  Text,
  TextArea,
  RadioGroup,
  Radio,
  Checkbox,
  Select,
  ValidationMessage
} from '../../packages/react-form-composer/src';

const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

const isValidSelector = state => state.formStatus.isValid;
const Button = (props) => (
  <FormSpy selector={isValidSelector}>
    {(isValid) => (
        <button {...props} style={{backgroundColor: isValid? 'green': 'cyan'}} >Submit</button>
    )}
  </FormSpy>
);

const lengthAtLeast5 = value => {
  return !value || value.length < 5 ? <div>Field must be at least five characters</div> : undefined;
}

const MyForm = () => {
  return (
    <FormStateProvider>
      <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, marginRight: '2rem' }}>
            <div>
              <label>Field One: <Text name="fieldOne" required validate={lengthAtLeast5}/></label>
              <ValidationMessage name="fieldOne"/>
            </div>
            <div>
              <label>Text Area: <TextArea name="fieldTwo"/></label>
            </div>
            <div>
              <label>Age: <Text name="fieldThree" type="number"/></label>
            </div>
            <div>
              <RadioGroup name="pet">
                <div><label>Dog: <Radio value="dog" selected/></label></div>
                <div><label>Cat: <Radio value="cat"/></label></div>
              </RadioGroup>
            </div>
            <div>
              <label>Authorize? <Checkbox name="authorize"/></label>
            </div>
            <div>
              <Select label="Frequency" name="frequency" required>
                <option value="" disabled>
                  Select One...
                </option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </Select>
            </div>
            <div>
              <Select label="Exercise" name="exercice" multiple>
                <option value="Walk">walk</option>
                <option value="Run">run</option>
                <option value="Cycle">cycle</option>
                <option value="Swim">swim</option>
              </Select>
            </div>
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
  form.updateFields({});
}

export default withDocs(readme, () => <MyForm/>);
