import { withDocs } from 'storybook-readme';
import readme from './array-form.md'
import React from 'react';
import {TextInput} from '../ui-components';
import { 
  FormStateProvider,
  Form,
  Scope,
  Field,
  FieldArray,
  useForm,
  useFormReducer
} from '../../packages/react-form-composer/src';

const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

const Button = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <button style={{backgroundColor: state.formStatus.isValid? 'green': 'cyan'}} >Submit</button>
  );
};

const submitValues = (values) => {
  alert(`You submitted: ${JSON.stringify(values, undefined, 2)}`);
};

const clearValues = (form) => {
  form.updateFields({});
};

const RenderHobbies = ({fields}) => (
  <fieldset>
    <legend className="example-form_title">
      Hobbies
    </legend>
    {fields.map((hobby, index) => (
      <Scope key={hobby} name={hobby}>
        <TextInput
          name="nameOfHobby"
          required
          label="Hobby name"
        />
        <TextInput
          name={`notes`}
          required
          label="notes"
          size="60"
        />
        <button type="button" title="Remove Hobby" onClick={() => fields.remove(index)}>-</button>
        <hr/>
      </Scope>
    ))}
    <button type="button" onClick={() => fields.push()}>Add Hobby</button>
  </fieldset>
);

const MyForm = () => {  
  return (
    <FormStateProvider>
      <Form name="myForm" initialValues={{hobbies:[{}]}} onSubmit={submitValues} onSubmitSuccess={clearValues} className="my-form">
        <FieldArray
          name="hobbies"
          component={RenderHobbies}
        />
        <Button/>
        <TheFormState />
      </Form>
    </FormStateProvider>
  );
};

export default withDocs(readme, () => <MyForm/>);
