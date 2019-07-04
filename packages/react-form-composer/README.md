# react-form-composer

### Go to [live examples, code and docs](https://chrisfield.github.io/react-form-composer/).

[![NPM Version](https://img.shields.io/npm/v/react-form-composer.svg?style=flat)](https://www.npmjs.com/package/react-form-composer)
[![NPM Downloads](https://img.shields.io/npm/dm/react-form-composer.svg?style=flat)](https://npmcharts.com/compare/react-form-composer?minimal=true)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-form-composer.svg)
[![Build Status](https://travis-ci.com/chrisfield/react-form-composer.svg?branch=master)](https://travis-ci.com/chrisfield/react-form-composer)

## Introduction
From the simplest login form to large multi-row CRUD applications react-form-composer provides an easy to use, none perscriptive and lightweight solution. It works well for web react-native and server-rendered applications. 

React-form-composer is written with hooks, is optimized for lightening fast rendering and it gives you control over where to store form state.

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
I'm keen to get feedback please let me know about any issues [here](https://github.com/chrisfield/react-form-composer/issues/new)


---
### Go to [live examples, code and docs](https://chrisfield.github.io/react-form-composer/).