# react-form-composer

### Go to [live examples, code and docs](https://chrisfield.github.io/react-form-composer/).

[![NPM Version](https://img.shields.io/npm/v/react-form-composer.svg?style=flat)](https://www.npmjs.com/package/react-form-composer)
[![NPM Downloads](https://img.shields.io/npm/dm/react-form-composer.svg?style=flat)](https://npmcharts.com/compare/react-form-composer?minimal=true)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-form-composer.svg)

## Introduction
React-form-composer is a lightweight, simple, and efficient solution for creating forms in react. As you would expect it makes it easy it to get and set field values, to validate and format fields, to create custom inputs and to access an error count. It works well for web, native and server-rendered applications and it gives you control to choose or change where to store form state.

Version 1 is a rename/rebrand of [redux-formkit](https://www.npmjs.com/package/redux-formkit). The new name communicates more clearly that it uses standard React state and has no dependency on Redux.

 If you do want to access form state through Redux it's easy to add it using [react-form-composer-redux-provider](https://www.npmjs.com/package/react-form-composer-redux-provider).


## Getting Started

##### Install with npm or yarn
`npm install --save react-form-composer` or `yarn add react-form-composer`


#### Create a Simple Form

```jsx
import React from 'react';
import {FormStateProvider, Form, Field} from 'react-form-composer';

const MyForm = () => {  
  return (
    <FormStateProvider>
      <Form name="myForm" onSubmit={submitValues}>
        <label>First name: <Field name="firstName" component="input"/></label>
        <button>Submit</button>
      </Form>
    </FormStateProvider>
  );
};

function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

export default MyForm;
```

## Features
- Small bundle size ([see bundlephobia](https://bundlephobia.com/result?p=react-form-composer))
- React-native support
- Simple to use with next js
- Isomophic support to enter values before js downloads
- Easy to add (or remove) Redux. See [`react-form-composer-redux-provider`](https://www.npmjs.com/package/react-form-composer-redux-provider) ([See example](https://github.com/chrisfield/react-form-composer/tree/master/examples/with-redux))
- Stores values as semantic types, eg number fields will store numbers
- Format values, eg to put commas in numbers
- Field-arrays for repeated rows with add/remove
- Keeps a running error-count and valid/not valid status
- Synchronous validation including flexible support for inter-field valiation
- Asynchronous submit validation


## Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/chrisfield/react-form-composer/issues)
I'm keen to get feedback please let me know about any issues [here](https://github.com/chrisfield/react-form-composer/issues/new)


---
### Go to [live examples, code and docs](https://chrisfield.github.io/react-form-composer/).