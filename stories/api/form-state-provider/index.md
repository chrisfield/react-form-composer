# FormStateProvider
Makes use of the standard React useReducer hook to provide a context to children/descendants (often including `Form`) so these can call the `useFormReducer` hook to get form state and a dispatch function.

`FormStateProvider` gives you choices over where you store form state. eg you could have a single `FormStateProvider` at the root of an application or have a separate one for each form or anything in between.

If you want to use `Redux` use the [react-form-composer-redux-provider](https://www.npmjs.com/package/react-form-composer-redux-provider) npm module.

| Property Name      | Required | Description                                                                                                                                                                                                                                                                                                                                                                                           |
|--------------------|----------|------------------------------------------------------------------------------------------------------------|
| initialState       |          | Any initialState to provide to forms. Particularly useful for next.js forms (see code below)               |
| children           |          | Normal JSX children. Often this will include `Form` components                                             |

---

``` jsx
import MyForm from '../components/my-form';
import {
  FormStateProvider,
  useFormReducer,
  updateFieldsAction,
  formReducer
} from 'react-form-composer'; 

const Index = ({initialValues}) => {
  return (
    <FormStateProvider initialState={formReducer(undefined, {form: 'myForm', ...updateFieldsAction(initialValues)})}>
      <MyForm/>
    </FormStateProvider>
  );
};

Index.getInitialProps = async () => ({
  initialValues: {
    fieldOne:'val f1',
    hobbies: [{description: 'Cave Diving'}, {description: 'Knitting'}]
  }
});
```
