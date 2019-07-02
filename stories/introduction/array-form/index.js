import { withDocs } from 'storybook-readme';
import readme from './index.md'
import React from 'react';
import {TextInput} from '../../ui-components';
import { 
  FormStateProvider,
  Form,
  Scope,
  Field,
  FieldArray,
  useForm,
  useFormReducer
} from '../../../packages/react-form-composer/src';

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
          id={index}
          required
          label="Hobby name"
        />
        <TextInput
          name={`notes`}
          id={index}
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

const RenderShoppingList = ({fields}) => (
  <fieldset>
    <legend className="example-form_title">
      Shopping List
    </legend>
    {fields.map((item, index) => (
      <div key={index}>
        <TextInput
          name={item}
          required
          label="Item"
        />
        <button type="button" title="Remove Item" onClick={() => fields.remove(index)}>-</button>
        <hr/>
      </div>
    ))}
    <button type="button" onClick={() => fields.push()}>Add Item</button>
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
        <FieldArray
          name="shoppingList"
          component={RenderShoppingList}
        />
        <Button/>
        <TheFormState />
      </Form>
    </FormStateProvider>
  );
};

export default withDocs(readme, () => <MyForm/>);
