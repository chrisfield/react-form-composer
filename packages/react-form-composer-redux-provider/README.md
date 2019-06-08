# react-form-composer-redux-provider

[![NPM Version](https://img.shields.io/npm/v/react-form-composer-redux-provider.svg?style=flat)](https://www.npmjs.com/package/react-form-composer-redux-provider)
[![NPM Downloads](https://img.shields.io/npm/dm/react-form-composer-redux-provider.svg?style=flat)](https://npmcharts.com/compare/react-form-composer-redux-provider?minimal=true)

Use this module to connect [react-form-composer](https://www.npmjs.com/package/react-form-composer) to redux.  


## Motivation
This module makes it easy to use react-form-composer with redux. 


## Getting Started
Checkout [example](https://github.com/chrisfield/react-form-composer/tree/master/examples/with-redux)

To use it on you own project:
`npm install react-form-composer-redux-provider`
or
`yarn add react-form-composer-redux-provider` 


## Usage
Combine `formReducer` with your other reducers. Usually you will mount `formReducer` under 'form'. (To mount it elsewhere pass the mount-point key to `FormStateProvider` using prop `formReducerNamespace`).

Add one instance of the `FormStateProvider` anywhere below the react-redux provider and above forms in the component tree. 

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import FormStateProvider from "react-form-composer-redux-provider";
import { formReducer } from 'react-form-composer';
import MyForm from './my-form.jsx';

const reducer = combineReducers({
  form: formReducer // Use formReducerNamespace prop mount point is not 'form'
})

const store = createStore(
  reducer, undefined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const FormContainer = () => {
  return (
    <Provider store={store}>
      <FormStateProvider /* formReducerNamespace="my-forms" */ >
        <MyForm/>
      </FormStateProvider>
    </Provider>
  );
};

```