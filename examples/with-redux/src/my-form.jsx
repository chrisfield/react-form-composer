import React from 'react';
import FormStateProvider from 'react-form-composer-redux-provider';
import {
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
} from 'react-form-composer';

const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <pre>
      <code>{JSON.stringify(state.fieldValues, null, 2)}</code>
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
  return !value || value.length < 5 ? 'Field must be at least five characters' : undefined;
}

const flexColumn = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '10px',
  maxWidth: '200px'
}

const MyForm = () => {
  return (
    <FormStateProvider>
      <h1>Form With Redux</h1>
      <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
          <div style={flexColumn}>
            <label style={flexColumn}>
              Field One (5+ chars):
              <Text name="fieldOne" required validate={lengthAtLeast5}/>
            </label>
            <ValidationMessage name="fieldOne" render={error => <p>{error}</p>}/>
            <label style={flexColumn}>Text Area: <TextArea name="fieldTwo"/></label>
            <label style={flexColumn}>Age: <Text name="age" type="number"/></label>
            <RadioGroup name="pet">
              <div><label>Dog: <Radio value="dog" selected/></label></div>
              <div><label>Cat: <Radio value="cat"/></label></div>
            </RadioGroup>
            <label>Authorize? <Checkbox name="authorize"/></label>
            <label style={flexColumn}>
              Frequency
              <Select name="frequency" required>
                <option value="" disabled>
                  Select One...
                </option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </Select>
            </label>
            <label style={flexColumn}>
              Exercise
              <Select name="exercice" multiple>
                <option value="Walk">walk</option>
                <option value="Run">run</option>
                <option value="Cycle">cycle</option>
                <option value="Swim">swim</option>
              </Select>
            </label>
            <br/>
            <Button/>
          </div>
          <div style={{
            display: 'flex',
            maxWidth: '300px'
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

export default MyForm;