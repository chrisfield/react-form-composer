# react-form-composer-redux-provider

## ⚠️ ATTENTION ⚠️
From version 2.6.0 [react-form-composer](https://www.npmjs.com/package/react-form-composer) includes its own reduxFormStateProvider function so you will not need to install/use this module. 

Use this module to connect older versions of [react-form-composer](https://www.npmjs.com/package/react-form-composer) to redux.  


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