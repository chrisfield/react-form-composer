import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { formReducer, reduxFormStateProvider } from 'react-form-composer';
import MyForm from './my-form.jsx';

const reducer = combineReducers({
  // ...your other reducers here
  formData: formReducer // Pass formReducerNamespace prop to FormStateProvider if mount point is not "form"
});

const store = createStore(
  reducer, undefined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const FormStateProvider = reduxFormStateProvider(connect);

const FormContainer = () => {
  return (
    <Provider store={store}>
      <FormStateProvider formReducerNamespace="formData">
        <MyForm/>
      </FormStateProvider>
    </Provider>
  );
};

ReactDOM.render(<FormContainer />, document.getElementById("app"));
