# react-form-composer

### Go to [live examples, code and docs](https://chrisfield.github.io/react-form-composer/).

[![NPM Version](https://img.shields.io/npm/v/react-form-composer.svg?style=flat)](https://www.npmjs.com/package/react-form-composer)
[![NPM Downloads](https://img.shields.io/npm/dm/react-form-composer.svg?style=flat)](https://npmcharts.com/compare/react-form-composer?minimal=true)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-form-composer.svg)
[![Build Status](https://travis-ci.com/chrisfield/react-form-composer.svg?branch=master)](https://travis-ci.com/chrisfield/react-form-composer)

## Introduction

React-form-composer is an extendable, none-perscriptive, lightweight solution for creating forms in web, react-native and server-rendered applications. It is written with hooks, is optimized for lightening fast rendering and gives you control to choose or change where to store form state. The small but powerful api makes it suitable for anything from simple input forms through to large multi-row CRUD applications.

In Version 2.5.0 I added a set of ui-components: now it's even easier to get started.

## Getting Started

##### Install with npm or yarn
`npm install --save react-form-composer` or `yarn add react-form-composer`


#### Create a Simple Form

```jsx
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
```

## Going Further
React-form-composer is written for developers. For example, the built-in ui-components (like `Text`, `Checkbox`) make no use of any special/private features - they are written using the public api provided by the `Field` component.

Design choices like this is what makes react-form-composer none-perscriptive - you can easily write your own ui-components or add features in many other ways.

To see this in practise take a look at the Form Examples like [react-native](https://github.com/chrisfield/react-form-composer/tree/master/examples/with_react_native) and [isomophic-validation](https://github.com/chrisfield/react-form-composer/tree/master/examples/universal-validation) or checkout the CRUD example mentioned below.

#### Create a CRUD/REST-api form ([See live example](https://chrisfield.github.io/react-form-composer/?path=/story/introduction--row-editor))

```jsx
import React from 'react';
import RestApiCrudForm from '../../data-components/rest-api-crud-form';
import {TextInput, NumberInput, Checkbox} from '../../ui-components';

const USER_ID=3;
const Todo = ({disabled=false, index}) => {
  return (
    <>
      <NumberInput
        defaultValue={USER_ID}
        disabled={true}
        name="userId"
        id={`userId${index}`}
        required
        label="userId"
      />
      <NumberInput
        disabled={true}
        name="id"
        id={`id${index}`}
        label="id"
      />
      <TextInput
        disabled={disabled}
        name="title"
        id={`title${index}`}
        required
        label="Title"
      />
      <Checkbox
        disabled={disabled}
        name="completed"
        id={`completed${index}`}
        label="Completed"
      />
    </>
  );
}

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const MyForm = () => (
  <RestApiCrudForm
    name="todoList"
    resourceUrl={TODOS_URL}
    urlForRead={`${TODOS_URL}?userId=${USER_ID}`}
    inputComponent={Todo}
  />
);

export default MyForm;

```

## Features
- Easy to write mult-row CRUD Forms connected to a rest api ([See live example](https://chrisfield.github.io/react-form-composer/?path=/story/introduction--row-editor))
- Optimized for lightening fast rendering ([See live example](https://chrisfield.github.io/react-form-composer/?path=/story/introduction--optimization))
- Small bundle size ([see bundlephobia](https://bundlephobia.com/result?p=react-form-composer))
- React-native support ([See example](https://github.com/chrisfield/react-form-composer/tree/master/examples/with_react_native))
- Perfect for server-rendering ([See example](https://github.com/chrisfield/react-form-composer/tree/master/examples/with-next))
- Easy to add (or remove) Redux. See [`react-form-composer-redux-provider`](https://www.npmjs.com/package/react-form-composer-redux-provider) ([See example](https://github.com/chrisfield/react-form-composer/tree/master/examples/with-redux))
- Stores values as semantic types, eg number fields will store numbers
- Format values, eg to put commas in numbers
- Field-arrays for repeated rows with add/remove
- Keeps a running error-count and valid/not valid status
- Synchronous and asynchronous validation 
- Easy inter-field valiation ([See live example](https://chrisfield.github.io/react-form-composer/?path=/story/introduction--validation))

## Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/chrisfield/react-form-composer/issues)
I'm keen to get feedback and to work collaboratively. Please let me know about any issues/ideas [here](https://github.com/chrisfield/react-form-composer/issues/new).


---
### Go to [live examples, code and docs](https://chrisfield.github.io/react-form-composer/).