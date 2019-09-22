# react-form-composer

### Go to [live examples, code and docs](https://chrisfield.github.io/react-form-composer/).

[![NPM Version](https://img.shields.io/npm/v/react-form-composer.svg?style=flat)](https://www.npmjs.com/package/react-form-composer)
[![NPM Downloads](https://img.shields.io/npm/dm/react-form-composer.svg?style=flat)](https://npmcharts.com/compare/react-form-composer?minimal=true)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-form-composer.svg)
[![Build Status](https://travis-ci.com/chrisfield/react-form-composer.svg?branch=master)](https://travis-ci.com/chrisfield/react-form-composer)

## Introduction

React-form-composer provides validation and state management for react, react-native and isomorphic forms. It has a download size of less than 7kB, is written with hooks and is optimized for fast rendering.

The small but powerful api is simular to ones provided by [Informed](https://www.npmjs.com/package/informed) or [Redux-Form](https://www.npmjs.com/package/redux-form) and it makes it suitable for anything from simple input forms through to large multi-row CRUD applications.

From Version 2.5 a set of ui-components is included. Version 3.0 has been simplified - now it is easier to get started.

## Getting Started

##### Install with npm or yarn
`npm install --save react-form-composer` or `yarn add react-form-composer`


#### Create a Simple Form

```jsx
import React from 'react';
import {
  Form,
  FormSpy,
  useForm,
  Text,
  TextArea,
  RadioGroup,
  Radio,
  Checkbox,
  Select,
  ValidationMessage
} from 'react-form-composer';

const TheFormState = () => {
  const {state} = useForm();
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
    <Form onSubmit={submitValues} onSubmitSuccess={clearValues}>
      <label>
        Field One (5+ chars):
        <Text name="fieldOne" required validate={lengthAtLeast5}/>
      </label>
      <ValidationMessage name="fieldOne" render={error => <p>{error}</p>}/>
      <label>Text Area: <TextArea name="fieldTwo"/></label>
      <label>Age: <Text name="age" type="number"/></label>
      <RadioGroup name="pet">
        <div><label>Dog: <Radio value="dog" selected/></label></div>
        <div><label>Cat: <Radio value="cat"/></label></div>
      </RadioGroup>
      <label>Authorize? <Checkbox name="authorize"/></label>
      <label>
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
      <label>
        Exercise
        <Select name="exercice" multiple>
          <option value="Walk">walk</option>
          <option value="Run">run</option>
          <option value="Cycle">cycle</option>
          <option value="Swim">swim</option>
        </Select>
      </label>
      <Button/>
      <TheFormState/>
    </Form>
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

To see this in practise take a look the CRUD example:

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
- Optimized for efficient rendering ([See live example](https://chrisfield.github.io/react-form-composer/?path=/story/introduction--optimization))
- Small bundle size ([see bundlephobia](https://bundlephobia.com/result?p=react-form-composer))
- React-native support 
- Perfect for server-rendering
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