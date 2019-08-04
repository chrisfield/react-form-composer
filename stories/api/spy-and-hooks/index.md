# FormSpy and Hooks

## FormSpy
FormSpy retrieves specified parts of the form state in an optimized way: it calls a child render function only when the selected state changes. To specify what part of the state you want simply pass in a selector function.

FormSpy is usually a more efficient way to access state values than useFormReducer or useField.

```
const isValidSelector = state => state.formStatus.isValid;

const Button = (props) => (
  <FormSpy selector={isValidSelector}>
    {(isValid) => (
      <RenderCount>
        <button {...props} style={{backgroundColor: isValid? 'green': 'cyan'}} >Submit</button>
      </RenderCount>
    )}
  </FormSpy>
);
```

## useForm
`useForm()` can be called by any children/decsendants of `Form` or `FormContextProvider`. It returns an object with the following properties: 

| Property Name   | Type     | Description                                                              |
|-----------------|----------|--------------------------------------------------------------------------|
| name            | String   | Name of the Form                                                        |
| state           | Object   | The Form state                                                        |
| dispatch        | function | Call this with an action to update the form state                                                        |


## useField
`useField('myFieldOne')` can be called by any children/decsendants of a `Form`. It takes a field-name as a parameter and returns an object with field properties about the field.
```
const PartnerName = () => {
  const isSingle = useField('isSingle').value;
  if (!isSingle) {
    return <TextInput name="partnerName" required/>
  }
  return null;
}
```
The  object returned by useField includes these standard props: 
* `value`: value from the store
* `error`: undefined if valid. Otherwise an error which will usually be a string (but can be any plain object)
* `touched`: boolean. has the field been tabbed through or validated due to submit 
* `dispatch`: function to dispatch a an action for this field to the form-reducer
* `customProps`: A prop set to the value returned by a `beforeUpdate function` (see Field Api for more info)


## useFormReducer
`useFormReducer('myForm')` can be called by any children/decsendants of a `FormStateProvder`. It takes a form-name as a parameter and returns state and dispatch in a two element array. The returned array is like the one that would be returned from the standard [React useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) hook. This simularity is no accident because, when you are not using redux, useFormReducer just passes the work on to useReducer.

If you are using `Redux` then the `[state, dispatch]` returned from a call to `useFormReducer('formOne')` will from Redux but will still be specifically for the named form.
```
const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};
```
Note that components that make use of useFormReducer will re-render for every state change. In many situations `FormSpy` can be used instead.


## useScope
Call `useScope()` from any component that might be the child/desendant of a `Scope`. It returns an object with one property called name - this is the name given to the `Scope`. You can optionally add a string parameter (for field-name) like `useScope('fieldOne')`. When you add a parameter it will be appended the scope with a dot.

```
import {useForm, useFormReducer, useScope, getField} from 'react-form-composer';

const ErrorMessage = ({fieldName}) => {
  const { name: formName } = useForm();
  const [formState] = useFormReducer(formName);
  const { name: fullFieldName } = useScope(fieldName);
  const {error} = getField(formState.fieldStatus, fullFieldName);
  return error
};
```

With the code above 
```
  <Form name="booking">
    <Scope name="holidayAddress">
      <TextInput name="line1" required>
      <ErrorMessage fieldName="line1">
    </Scope>
  </Form>
```
`ErrorMessage` would render any error found at `booking.fieldStatus.holidayAddress.line1.error`

and

```
  <Form name="booking">
    <div>
      <TextInput name="line1" required>
      <ErrorMessage fieldName="line1">
    </div>
  </Form>
```
would render any error found at `booking.fieldStatus.line1.error`
