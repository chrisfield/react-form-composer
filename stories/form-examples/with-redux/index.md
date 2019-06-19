# With Redux
Redux-form-composer normally uses standard react state. The [with-redux example](https://github.com/chrisfield/react-form-composer/tree/master/examples/with-redux). shows how you can switch to use Redux by adding [react-form-composer-redux-provider](https://www.npmjs.com/package/redux-form-composer-redux-provider)

In this example I have the redux provider, the form state provider and the form all in one component so it's self contained. It also works fine having redux and the form state provider on a root component so all forms across your application use the same redux store.

Note: the universal-validation example happens to use redux so check it out if you want forms in next0js with redux.

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
    </Provider>the 
  );
};

ReactDOM.render(<FormContainer />, document.getElementById("app"));
```