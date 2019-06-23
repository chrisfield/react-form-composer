# Intro
React-form-composer is a lightweight, simple, and efficient solution for creating forms in react. As you would expect it makes it easy to get and set field values, to validate and format fields, to create custom inputs and to access an error count.

It works well for web, react-native and server-rendered applications and it gives you control to choose or change where to store form state.

Redux-form-composer has been written with hooks. Check out the [Github repo](https://github.com/chrisfield/react-form-composer). 

[![NPM Version](https://img.shields.io/npm/v/react-form-composer.svg?style=flat)](https://www.npmjs.com/package/react-form-composer)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-form-composer.svg)


# A Simple Form
##### Install with npm or yarn
`npm install --save react-form-composer` or `yarn add react-form-composer`

## Try out this minimal form

I have written the form below in a way that includes a few key concepts. Try it out then take a look at the code snippet and explanation.

<!-- STORY -->

---
#### Code
```jsx
import React from 'react';
import {FormStateProvider, Form, useForm, useFormReducer, Field, FormSpy} from 'react-form-composer';

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

const requiredStr = (value, _values, {label}) => {
  return value && value.trim && value.trim().length > 0 ? undefined: `Please enter a value for ${label.toLowerCase()}`
};

const MyForm = () => {  
  return (
    <FormStateProvider>
      <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues}>
        <div>
          <div>
            <label>First name: <Field name="firstName" component="input"/></label>
          </div>
          <Field name="lastName" validate={requiredStr} label="Last Name:">
            {({name, value, error, touched, handleChange, handleBlur, elementRef, label}) => (
              <div>
                <label htmlFor={name}>{label}</label>
                <input id={name} value={value} onChange={handleChange} onBlur={handleBlur} ref={elementRef}/>
                {touched && error && <p>{error}</p>}
              </div>
            )}
          </Field>
          <Button/>
          <TheFormState/> 
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
```
---

#### Explanation
`FormStateProvider` decouples getting and setting form-state from the rest of the framework. It makes it is easy to do things like  pull state up to an application level or swap to/from Redux. Often, like here, you will just wrap each `Form` in a `FormStateProvider`.

The `Form` components default behaviour is to render it's children in a form. The `onSubmit` and `onSubmitSuccess` props do what their names suggest.

The example shows two of the ways that `Field` can be used to render an input:
* firstName passes "input" to a prop called component
* lastName provides a child render function

It also shows two alternative ways to 'manually' access parts of the form-state:
* `TheFormState` custom component has been written with `useFormReducer`
* `Button` has been written with `FormSpy`.

`FormSpy` is an optimized component that takes a selector prop - in this case a function that returns the isValid status of the form which is then used to toggle the green background-color.

`useForm` is a hook you can use to access the `Form`. The example above simply uses it to get the form name (to avoid hardcoding "myForm" again).

`useFormReducer` is a hook that takes a form-name as a parameter and returns state and dispatch in a two element array. The returned array is like the one that would be returned from the standard [React useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) hook. This simularity is no accident because, when you are not using redux, useFormReducer just passes the work on to useReducer.


#### Next Steps
The next section shows a form with a wider range of ui-components. Writing ui-components is fairly easy and will simplify your forms.
