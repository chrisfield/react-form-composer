# Optimization
Only the components that need updating are re-rendered as the form's state changes. This page shows the various render counts so you can see this in practice.

The submit button makes use of the FormSpy component. FormSpy is an optimized component to access parts of form state (the isValid status in this case). It more efficient than useFormReducer which would rerender with every state change.

<!-- STORY -->

---
#### Code
```jsx
import React from 'react';
import {FormStateProvider, Form, Field, FieldArray, FormSpy} from 'react-form-composer';
import {RenderCount} from '../../ui-components';

const isValidSelector = state => state.formStatus.isValid;

const Button = (props) => (
  <FormSpy selector={isValidSelector}>
    {(isValid) => (
      <RenderCount>
        <button {...props} style={{backgroundColor: isValid? 'green': 'cyan'}} >Submit</button>
      </RenderCount>
    )}
  </FormSpy>
);

const requiredStr = (value) => {
  return value && value.trim && value.trim().length > 0 ? undefined: 'Please enter a value'
};

const TextInput = ({name, validate, label}) => (
  <Field name={name} validate={validate} render={
    ({name, value, handleChange, handleBlur, error, touched, elementRef}) => {
      return <>
        <label>
          <RenderCount>
              {label}
              <input value={value} name={name} onChange={handleChange} onBlur={handleBlur} ref={elementRef}/>
          </RenderCount>
        </label>
        {touched && error && <div>{error}</div>}
      </>
    }
  }/>
);

const RenderShoppingList = ({fields}) => (
  <fieldset>
    <legend className="example-form_title">
      Shopping List
    </legend>
    {fields.map((item, index) => (
      <div key={index}>
        <TextInput label="Item" name={item} validate={requiredStr}/>
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
      <Form name="myForm" initialValues={{shoppingList:['Bread']}} onSubmit={submitValues} onSubmitSuccess={clearValues}>
        <RenderCount name="Whole form">
          <TextInput name="firstName" label="First Name"/>
          <TextInput name="middleName" label="Middle Name"/>
          <TextInput name="lastName" label="Last Name" validate={requiredStr}/>
          <FieldArray name="shoppingList" component={RenderShoppingList}/>
          <Button/>
        </RenderCount>
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
```
