# Form

Renders an html form and acts as a container for `Fields`. `Form` components must directly or indirectly be inside a `FormStateProvider`.
Any children/descendants of Form can use the `useForm` hook to get the form name.

When you create a `<Form>` these are the properties to set. Any additional props will be passed on to to the rendered component (or function)

| Property Name | Required | Description                                                                                                                                                                                                                                                                                                                                                                     |
|---------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name          | Yes      | String. A unique name for the Form                                                                                                                                                                                                                                                                                                                                              |
| initialValues |          | Object. Any initial field values for the form. Note you can also set field values by dispatching an updateFields action                                                                                                                                                                                                                                                         |
| onSubmit      |          | Function. Use this to submit the field-values which will be passed in as a parameter. It can make api calls syncronously or by returning a promise. It will only be called if the form fields are valid. An important point to make is that this function can return error messages back to the form. If you do not pass an onSubmit prop a traditional submit will take place. |
| onSuccess     |          | Function. Use this to reset the form fields or show a feedback message etc. It will be passed the form instance as a parameter.                                                                                                                                                                                                                                                 |
| onMount       |          | Function. It will be passed the formApi object (see below). Can be used eg to set focus on first field                                                                                                                                                                                                                                                                          |
| onUnount      |          | Function. It will be passed the formApi object (see below). Can be used eg to return focus to a particular field outside the form                                                                                                                                                                                                                                               |
| component     |          | String or node. This is what will be rendered as the outer element (default is form)                                                                                                                                                                                                                                                                                            |
| render        |          | function. A render function that will be called with props handleSubmit and elementRef                                                                                                                                                                                                                                                                                          |
| children      |          | Node or function. A function that will be called with props handleSubmit and elementRef. Or normal JSX children                                                                                                                                                                                                                                                                 |

---

`Form` will pass these props to the rendered component (or function):
* `handleSubmit` Call this function with no params validate and submit values
* `elementRef` You can pass this as the ref prop if you render a form in a render function

---

The formApi object (passed to any onSuccess function) includes these props:

| Property Name | Type     | Description                                                    |
|---------------|----------|----------------------------------------------------------------|
| name          | String   | Name of the Form                                               |
| getField      | Function | Call this with a fieldName to return the fieldApi              |
| getFields     | Function | Call this return an array of the fields                        |
| updateFields  | Function | Call this with the field values to reset the form field values |
| dispatch      | Function | Call this with am action to update any form state              |
| state         | Object   | The current Form state.                                        |

---