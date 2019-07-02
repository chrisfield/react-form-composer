import { withDocs } from 'storybook-readme';
import readme from './index.md'
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
} from '../../../packages/react-form-composer/src';

const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

const Row = ({disabled=false, index}) => {
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
        disabled={disabled}
        name="id"
        id={`id${index}`}
        required
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

const ButtonWithCancel = ({text, isActive, setActive}) => {
  const toggle = () => {
    setActive(!isActive);
  };
  const buttonText = isActive? 'Canel': text;
  return (
    <button type="button" onClick={toggle}>{buttonText}</button>
  );
} 

const Formlet = ({children, onSubmit, onSubmitSuccess}) => {
  const {name: formName, state: formState} = useForm();
  return (
    <div>
      <FormStateProvider initialState={{[formName]: formState}}>
        <Form
          name={formName}
          onSubmit={onSubmit}
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

const DeleteButton = ({deleteRow, rowName}) => {
  const [state] = useFormReducer(useForm().name);
  const id = getStateValueByPath(state.fieldValues, `${rowName}.id`);
  const handleDelete = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(json => console.log('Server response', json));
    console.log('Deleted todo with id', id);
    deleteRow();
  };
  return <button onClick={handleDelete}>Confirm Delete</button>
};

const RowEditor = ({rowName, rowIndex, deleteRow}) => {
  const [isActive, setActive] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const {dispatch} = useForm();

  const handleSubmit = (fieldValues)=> {
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
  };

  const handleSubmitSuccess = formApi => {
    dispatch(updateFieldAction(rowName, getStateValueByPath(formApi.state.fieldValues, rowName)));
    setActive(false);
  };

  const handleDelete = () => {
    deleteRow();
    setDeleting(false);
  };

  if (isActive) {
    return (
      <div>
        <Formlet rowName={rowName} onSubmit={handleSubmit} onSubmitSuccess={handleSubmitSuccess}>
          <ButtonWithCancel text="Edit" isActive={isActive} setActive={setActive}/>
          <SaveButton/>
          <Row index={rowIndex}/>
        </Formlet>
      </div>
    );    
  }

  if (isDeleting) {
    return (
      <div>
        <DeleteButton deleteRow={handleDelete} rowName={rowName}/>
        <ButtonWithCancel text="Delete" isActive={isDeleting} setActive={setDeleting}/>
        <Row index={rowIndex} disabled/>
      </div>
    );      
  }

  return (
    <div>
      <ButtonWithCancel text="Edit" isActive={isActive} setActive={setActive}/>
      <ButtonWithCancel text="Delete" isActive={isDeleting} setActive={setDeleting}/>
      <Row index={rowIndex} disabled/>
    </div>
  );
} 

const RowCreator = ({createRow}) => {
  const rowName = 'NEW-ROW';
  const [isActive, setActive] = useState(false);
  const handleSubmitSuccess = formApi => {
    setActive(false);
  };

  const handleSubmit = (fieldValues) => {
    const values = getStateValueByPath(fieldValues, rowName)
    fetch(`https://jsonplaceholder.typicode.com/todos`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log('Server response is', json);
      createRow(json);
    });
  };

  if (isActive) {
    return (
      <div>
        <Formlet
          rowName={rowName}
          onSubmit={handleSubmit}
          onSubmitSuccess={handleSubmitSuccess}
        >
          <ButtonWithCancel text="Create" isActive={isActive} setActive={setActive}/>
          <SaveButton/>
          <Scope name={rowName}>
            <Row index={0}/>
          </Scope>
        </Formlet>
      </div>
    );
  }

  return (
    <ButtonWithCancel text="Create" isActive={isActive} setActive={setActive}/>
  );
};

const RenderTodoList = ({fields}) => (
  <fieldset>
    <legend>
      Todo List
    </legend>
    {fields.map((todo, index) => (
      <Scope key={index} name={todo}>
        <RowEditor rowName={todo} rowIndex={index} deleteRow={() => fields.remove(index)}/>
        <hr/>
      </Scope>
    ))}
    <RowCreator createRow={values => fields.push(values)}/>
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

export default withDocs(readme, () => <MyForm/>);
