# With Redux
Redux-form-composer normally uses standard react state. The [with_redux example](https://github.com/chrisfield/react-form-composer/tree/master/examples/with_redux). shows how you can switch to use Redux by adding [react-form-composer-redux-provider](https://www.npmjs.com/package/redux-form-composer-redux-provider)

---
``` jsx
import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import FormStateProvider from "react-form-composer-redux-provider";
import { formReducer } from 'react-form-composer';
import MyForm from './my-form.jsx';

const reducer = combineReducers({
  // ...your other reducers here
  form: formReducer
});

const store = createStore(
  reducer, undefined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const FormContainer = () => {
  return (
    <Provider store={store}>
      <FormStateProvider>
        <MyForm/>
      </FormStateProvider>
    </Provider>
  );
};

ReactDOM.render(<FormContainer />, document.getElementById("app"));
```