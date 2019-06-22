# Optimization
Only the components that need updating are re-rendered as the form's state changes. This page shows the various render counts so you can see this in practice.

The submit button makes use of the FormSpy component (in this case) to access the isValid value from form state - this is more efficient than useFormReducer (which would rerender with every state change).

Note that when the form first displays Field components with initial validation errors will render a second time. This is because they update when they recieve the error prop.

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

const RenderShoppingList = ({fields}) => (
  <fieldset>
    <legend className="example-form_title">
      Shopping List
    </legend>
    {fields.map((item, index) => (
      <>
        <Field name={item} validate={requiredStr} render={
          ({name, value, handleChange, handleBlur, error, touched, elementRef}) => (
            <>
              <label>
                <RenderCount>
                    Item
                    <input value={value} name={name} onChange={handleChange} onBlur={handleBlur} ref={elementRef}/>
                </RenderCount>
              </label>
              {touched && error && <div>{error}</div>}
            </>
          )
        }/>
        <button type="button" title="Remove Item" onClick={() => fields.remove(index)}>-</button>
        <hr/>
      </>
    ))}
    <button type="button" onClick={() => fields.push()}>Add Item</button>
  </fieldset>
);

const MyForm = () => {
  return (
    <FormStateProvider>
      <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues}>
        <RenderCount name="Whole form">
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, marginRight: '2rem' }}>
              <Field name="firstName"  render={
                ({name, value, handleChange, handleBlur}) => (
                  <label>
                    <RenderCount>
                      First Name
                      <input value={value} name={name} onChange={handleChange} onBlur={handleBlur}/>
                    </RenderCount>
                  </label>
                )
              }/>
              <Field name="middleName"  render={
                ({name, value, handleChange, handleBlur}) => (
                  <label>
                    <RenderCount>
                      Middle Name
                      <input value={value} name={name} onChange={handleChange} onBlur={handleBlur}/>
                    </RenderCount>
                  </label>
                )
              }/>
              <Field name="lastName"  validate={requiredStr} render={
                ({name, value, handleChange, handleBlur, error, touched, elementRef}) => (
                  <>
                  <label>
                    <RenderCount>
                        Last Name
                        <input value={value} name={name} onChange={handleChange} onBlur={handleBlur} ref={elementRef}/>
                      </RenderCount>
                    </label>
                    {touched && error && <div>{error}</div>}
                  </>
                )
              }/>
              <FieldArray name="shoppingList" component={RenderShoppingList}/>
              <Button/>
            </div>
          </div>
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
