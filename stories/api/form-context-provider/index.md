# FormContextProvider

Acts as a minimal container for `Fields` providing a named context that can be used as a kind of place holder for Form. It does not render a form or add any submit or validation logic. `FormContextProvider` components must directly or indirectly be inside a `FormStateProvider`. Any children/descendants of FormContextProvider can use the `useForm` hook to get the name etc. See the introduction/row-editor for an example of its use.

When you create a `<Form>` these are the properties to set

| Property Name | Required | Description                                                                                                                                                                                                                                                                                                                                                                     |
|---------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name          | Yes      | String. A unique name for the Form                                                                                                                                                                                                                                                                                                                                              |
| children      |          | Normal JSX children often including Fields.                                                                                                                                                                                                                                    |

---