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
`useForm()` can be called by any children/decsendants of `Form`. It returns an object with the following properties: 

| Property Name   | Type     | Description                                                              |
|-----------------|----------|--------------------------------------------------------------------------|
| state           | Object   | The Form state                                                           |
| dispatch        | function | Call this with an action to update the form state                        |

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

## useScope
Call `useScope()` from any component that might be the child/desendant of a `Scope`. It returns an object with one property called name - this is the name given to the `Scope`. You can optionally add a string parameter (for field-name) like `useScope('fieldOne')`. When you add a parameter it will be appended to the scope with a dot.
