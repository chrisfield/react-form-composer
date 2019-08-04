import { withDocs } from 'storybook-readme';
import readme from './index.md'

import React from 'react';
import {FormStateProvider, Form, useForm, useFormReducer, Text} from '../../../packages/react-form-composer/src';
import { SelectInput, NumberInput } from '../../custom-ui-components';

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

const stringToNumber = str => Number(str);

const Slider = (props) => (
  <Text
    type="range"
    min={0}
    max={100}
    step={5}
    defaultValue={25}
    formatToStore={stringToNumber}
    {...props}
  />
);

const MyForm = () => {
  return (
    <FormStateProvider>
      <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, marginRight: '2rem' }}>
            <div>
              <label>
                <div>Lucky number</div>
                <Slider name="luckyNumber"/>
              </label>
            </div>
            <SelectInput name="frequency" label="How often do you eat noodles" required>
              <option value="" disabled>
                Select One...
              </option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </SelectInput>
            <NumberInput name="age" required label="Age"/>
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
