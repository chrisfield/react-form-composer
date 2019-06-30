# Row Editor
The form below populates a series of rows with data fetched from https://jsonplaceholder.typicode.com/todos/?userId=2.

It is still a WIP but it does include one-row-at-a-time updates with an edit/cancel functionality like I've seen on several Angular applications. To implement this the Rows are rendered in a FormContextProvider. Only when the user presses 'Edit' for a particular Row are the Rows' Fields are rendered in a Form. 

<!-- STORY -->
---
#### Code
```jsx
import React, {useEffect, useState} from 'react';
import {TextInput, NumberInput, Checkbox} from '../../ui-components';
import {
  getStateValueByPath,
  FormStateProvider,
  Form,
  FormContextProvider,
  FormSpy,
  Scope,
  FieldArray,
  useForm,
  useFormReducer,
  updateFieldAction,
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

const Row = ({disabled=false}) => {
  return (
    <>
      <NumberInput
        disabled={disabled}
        name="userId"
        required
        label="userId"
      />
      <NumberInput
        disabled={true}
        name="id"
        required
        label="id"
      />
      <TextInput
        disabled={disabled}
        name="title"
        required
        label="Title"
      />
      <Checkbox
        disabled={disabled}
        name="completed"
        label="Completed"
      />
    </>
  );
}

const EditButton = ({isEditing, setEditing}) => {
  const toggleEditing = () => {
    setEditing(!isEditing);
  };
  const text = isEditing? 'Canel': 'Edit';
  return (
    <button type="button" onClick={toggleEditing}>{text}</button>
  );
} 

const Formlet = ({rowName, children, onSubmitSuccess}) => {
  const {name: formName, state: formState} = useForm();
  return (
    <div>
      <FormStateProvider initialState={{[formName]: formState}}>
        <Form
          name={formName}
          onSubmit={(fieldValues)=> {
            const rowValues = getStateValueByPath(fieldValues, rowName);
            console.log('Call endpoint here to update row:', rowValues);
            fetch(`https://jsonplaceholder.typicode.com/todos/${rowValues.id}`, {
              method: 'PUT',
              body: JSON.stringify(fieldValues),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            })
            .then(response => response.json())
            .then(json => console.log('Server response', json));
          }}
          onSubmitSuccess={onSubmitSuccess}
        >
          {children}
        </Form>
      </FormStateProvider>
    </div>
  );  
};

const isValidSelector = state => state.formStatus.isValid;
const SaveButton = () => (
  <FormSpy selector={isValidSelector}>
    {(isValid) => (
      <button style={{backgroundColor: isValid? 'green': 'cyan'}} >Save</button>
    )}
  </FormSpy>
);

const RowEditor = ({rowName}) => {
  const [isActive, setActive] = useState(false);
  const {dispatch} = useForm();
  const handleSubmitSuccess = formApi => {
    dispatch(updateFieldAction(rowName, getStateValueByPath(formApi.state.fieldValues, rowName)));
    setActive(false);
  };

  if (isActive) {
    return (
      <div>
        <EditButton isEditing={isActive} setEditing={setActive}/>
        <Formlet rowName={rowName} onSubmitSuccess={handleSubmitSuccess}>
          <Row/>
          <div>
            <SaveButton/>
          </div>
        </Formlet>
      </div>
    );    
  }

  return (
    <div>
      <EditButton isEditing={isActive} setEditing={setActive}/>
      <Row disabled/>
    </div>
  );
} 

const RenderTodoList = ({fields}) => (
  <fieldset>
    <legend>
      Todo List
    </legend>
    {fields.map((todo, index) => (
      <Scope key={index} name={todo}>
        <RowEditor rowName={todo}/>
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
        // {userId: 2, id: 21, title: "suscipit repellat esse quibusdam voluptatem incidunt", completed: false}
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
      <FormContextProvider name="myForm">
        <FieldArray
          name="todoList"
          arrayName="todoList"
          component={RenderTodoList}
        />
        <TheFormState />
      </FormContextProvider>
    </FormStateProvider>
  );
};

export default MyForm;

```