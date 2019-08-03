# Row Editor
The form below populates a series of rows with data fetched from https://jsonplaceholder.typicode.com/todos/?userId=3.

It provides a CRUD facility and includes one-row-at-a-time updates with an edit/cancel functionality like I've seen on several Angular applications. To implement this the Rows are rendered in a FormContextProvider. Only when the user presses 'Edit' for a particular Row are that Rows' Fields rendered in a Form.

---
#### Code
```jsx
import React from 'react';
import RestApiCrudForm from '../../data-components/rest-api-crud-form';
import {TextInput, NumberInput, Checkbox} from '../../custom-ui-components';

const USER_ID=3;
const Todo = ({disabled=false, index}) => {
  return (
    <>
      <NumberInput
        defaultValue={USER_ID}
        disabled={true}
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
const MyForm = () => (
  <RestApiCrudForm
    name="todoList"
    resourceUrl={TODOS_URL}
    urlForRead={`${TODOS_URL}?userId=${USER_ID}`}
    inputComponent={Todo}
  />
);

export default MyForm;

```
You might also want to look at the [code for data-components](https://github.com/chrisfield/react-form-composer/tree/master/stories/data-components). 

---

<!-- STORY -->
