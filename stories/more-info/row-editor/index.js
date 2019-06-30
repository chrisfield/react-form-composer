import { withDocs } from 'storybook-readme';
import readme from './index.md'
import React, {useEffect, useState} from 'react';
import {TextInput, NumberInput, Checkbox} from '../../ui-components';
import {
  initFormStateAction,
  getStateValueByPath,
  setStateValueByPath,
  formReducer,
  FormStateProvider,
  Form,
  FormContext,
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

const submitValues = (values) => {
  alert(`You submitted: ${JSON.stringify(values, undefined, 2)}`);
};

const clearValues = (form) => {
  form.updateFields({});
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
        disabled={disabled}
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

const EditButton = ({isEditing, setEditing}) =>{
  const toggleEditing = () => {
    setEditing(!isEditing);
  };
  const text = isEditing? 'Canel': 'Edit';
  return (
    <button type="button" onClick={toggleEditing}>{text}</button>
  );
} 

const Formlet = ({arrayName, rowName, children, onSubmitSuccess}) => {
  const {name: formName, state: formState} = useForm();
  const initialValues = [getStateValueByPath(formState.fieldValues, rowName)];
  const initialState = formReducer(undefined, initFormStateAction(formName,
    {fieldValues: setStateValueByPath({}, arrayName, initialValues)}
  ));
  return (
    <div>
      <FormStateProvider initialState={initialState}>
        <Form
          name={formName}
          onSubmit={(fieldValues)=>{console.log('Call endpoint here to update row:', fieldValues)}}
          onSubmitSuccess={onSubmitSuccess}
        >
          {children}
        </Form>
      </FormStateProvider>
    </div>
  );  
};

const RowEditor = ({arrayName, rowName}) => {
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
        <Formlet arrayName={arrayName} rowName={rowName} onSubmitSuccess={handleSubmitSuccess}>
          <Row/>
          <div>
            <button>save</button>
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

const RenderTodoList = ({arrayName, fields}) => (
  <fieldset>
    <legend>
      Todo List
    </legend>
    {fields.map((todo, index) => (
      <Scope key={index} name={todo}>
        <RowEditor arrayName={arrayName} rowName={todo}/>
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
      <FormContext name="myForm">
        <FieldArray
          name="todoList"
          arrayName="todoList"
          component={RenderTodoList}
        />
        <TheFormState />
      </FormContext>
    </FormStateProvider>
  );
};

export default withDocs(readme, () => <MyForm/>);
