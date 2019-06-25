# Row Editor
The form below populates a series of rows with data fetched from https://jsonplaceholder.typicode.com/todos/?userId=2.

<!-- STORY -->
---
#### Code
```jsx
import React, {useEffect} from 'react';
import {TextInput, NumberInput, Checkbox} from '../../ui-components';
import { 
  FormStateProvider,
  Form,
  Scope,
  FieldArray,
  useForm,
  useFormReducer,
  updateFieldsAction
} from 'react-form-composer';

const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

const Button = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <button style={{backgroundColor: state.formStatus.isValid? 'green': 'cyan'}} >Submit</button>
  );
};

const submitValues = (values) => {
  alert(`You submitted: ${JSON.stringify(values, undefined, 2)}`);
};

const clearValues = (form) => {
  form.updateFields({});
};

const RenderTodoList = ({fields}) => (
  <fieldset>
    <legend>
      Todo List
    </legend>
    {fields.map((todo, index) => (
      <Scope key={index} name={todo}>
        <NumberInput
          name="userId"
          required
          label="userId"
        />
        <NumberInput
          name="id"
          required
          label="id"
        />
        <TextInput
          name="title"
          required
          label="Title"
        />
        <Checkbox
          name="completed"
          label="Completed"
        />

        <button type="button" title="Remove Task" onClick={() => fields.remove(index)}>-</button>
        <hr/>
      </Scope>
    ))}
    <button type="button" onClick={() => fields.push()}>Add Task</button>
  </fieldset>
);


const Fetcher = () => {
  const dispatch = useFormReducer('myForm')[1];
  useEffect(() => {
    let isSubscribed = true;
    fetch('https://jsonplaceholder.typicode.com/todos/?userId=2')
    .then((data) => {
      data.json()
      .then(json => {
        if (isSubscribed) {
          dispatch (updateFieldsAction({todoList:json}));
        }
      }) 
    });
    return () => {isSubscribed = false};
  }, []);
  return null;
};

const MyForm = () => {  
  return (
    <FormStateProvider>
      <Fetcher/>
      <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues} className="my-form">
        <FieldArray
          name="todoList"
          component={RenderTodoList}
        />
        <Button/>
        <TheFormState />
      </Form>
    </FormStateProvider>
  );
};

export default MyForm;

```