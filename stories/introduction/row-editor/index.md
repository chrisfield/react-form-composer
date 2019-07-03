# Row Editor
The form below populates a series of rows with data fetched from https://jsonplaceholder.typicode.com/todos/?userId=2.

It provides a CRUD facility and includes one-row-at-a-time updates with an edit/cancel functionality like I've seen on several Angular applications. To implement this the Rows are rendered in a FormContextProvider. Only when the user presses 'Edit' for a particular Row are that Rows' Fields rendered in a Form.

Take a look at the [code for data-components](https://github.com/chrisfield/react-form-composer/tree/master/stories/data-components) if you are interested in this.

<!-- STORY -->
---
#### Code
```jsx
import React from 'react';
import FetchDispatcher from '../../data-components/fetch-dispatcher';
import RowEditor from '../../data-components/row-editor';
import RowCreator from '../../data-components/row-creator';
import {TextInput, NumberInput, Checkbox} from '../../ui-components';
import {
  FormStateProvider,
  FormContextProvider,
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


const Todo = ({disabled=false, index}) => {
  return (
    <>
      <NumberInput
        disabled={disabled}
        name="userId"
        id={`userId${index}`}
        required
        label="userId"
      />
      <NumberInput
        disabled={true}
        name="id"
        id={`id${index}`}
        label="id"
      />
      <TextInput
        disabled={disabled}
        name="title"
        id={`title${index}`}
        required
        label="Title"
      />
      <Checkbox
        disabled={disabled}
        name="completed"
        id={`completed${index}`}
        label="Completed"
      />
    </>
  );
}

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const RenderTodoList = ({fields: todoList}) => (
  <div>
    <h2>
      Todo list
    </h2>
    {todoList.map((todo, index) => (
      <Scope key={index} name={todo}>
        <RowEditor
          name={todo}
          component={Todo}
          rowIndex={index}
          deleteRow={() => todoList.remove(index)}
          url={values=>`${TODOS_URL}/${values.id}`}
        />
        <hr/>
      </Scope>
    ))}
    <RowCreator
      name="todo"
      component={Todo}
      createRow={values => todoList.push(values)}
      url={TODOS_URL}
    />
  </div>
);


const MyForm = () => {  
  return (
    <FormStateProvider>
      <FetchDispatcher
        url={TODOS_URL}
        dispatchSelector={values => (
          updateFieldsAction({todoList:values})
        )}
      />
      <FormContextProvider name="myForm">
        <FieldArray
          name="todoList"
          component={RenderTodoList}
        />
        <TheFormState />
      </FormContextProvider>
    </FormStateProvider>
  );
};

export default MyForm;

```