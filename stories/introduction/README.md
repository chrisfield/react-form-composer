# Intro
React-form-composer is a lightweight, simple, and efficient solution for creating forms in react. As you would expect it makes it easy it to get and set field values, to validate and format fields, to create custom inputs and to access an error count. It works well for web, react-native and server-rendered applications and it gives you control to choose or change where to store form state.

Check out the [Github repo](https://github.com/chrisfield/react-form-composer). Redux-form-composer has been written with hooks. 

[![NPM Version](https://img.shields.io/npm/v/react-form-composer.svg?style=flat)](https://www.npmjs.com/package/react-form-composer)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-form-composer.svg)


# Getting Started
##### Install with npm or yarn
`npm install --save react-form-composer` or `yarn add react-form-composer`

## Try out this minimal form

Go ahead and play around with the form below then take a look at the code snippet and explanation.

<!-- STORY -->

---
#### Code
```jsx
import React from 'react';
import {FormStateProvider, Form, useForm, useFormReducer, Field} from 'react-form-composer';

const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

const MyForm = () => {  
  return (
    <FormStateProvider>
      <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues}>
        <div>
          <label>First name: <Field name="firstName" component="input"/></label>
        </div>
        <button>Submit</button>
        <div>
          <label>Values:</label>
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
`FormStateProvider` links `Form` components to React state. To switch to using Redux simply `import FormStateProvider from "react-form-composer-redux-provider"`

`Form` uses an `onSubmit` function to mark the fields as touched, to check if the form is valid and, if it is, to call your `submitValues` function passing in the form values from state.

`Field` uses `onChange`, `onBlur` functions to maintain the field value in state. It renders the *component* ("input" in the above example) passing in the state.

`useForm` is a hook you can use to access the `Form`. The example above simply uses it to get the form name (to avoid hardcoding "myForm" again).

`useFormReducer` is a hook that takes a form-name as a parameter and returns state and dispatch in a two element array. The returned array is like the one that would be returned from the standard [React useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) hook. This simularity is no accident because, when you are not using redux, useFormReducer just passes the work on to useReducer.

#### Next Steps
In the next section you can see a form with a wider range of ui-components.
