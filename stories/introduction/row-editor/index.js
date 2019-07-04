import 'isomorphic-unfetch';
import { withDocs } from 'storybook-readme';
import readme from './index.md'
import React from 'react';
import FetchDispatcher from '../../data-components/fetch-dispatcher';
import RowEditor from '../../data-components/row-editor';
import RowCreator from '../../data-components/row-creator';
import FormStateSelector from '../../data-components/form-state-selector';
import {TextInput, NumberInput, Checkbox} from '../../ui-components';
import {
  FormStateProvider,
  FormContextProvider,
  Scope,
  FieldArray,
  updateFieldsAction
} from '../../../packages/react-form-composer/src';

const Todo = ({disabled=false, index}) => {
  return (
    <>
      <NumberInput
        defaultValue={2}
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
const focusOnFirstField = formApi => {formApi.getField('title').element.focus()};
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
          onMount={focusOnFirstField}
        />
        <hr/>
      </Scope>
    ))}
    <RowCreator
      name="todo"
      component={Todo}
      createRow={values => todoList.push(values)}
      url={TODOS_URL}
      onMount={focusOnFirstField}
    />
  </div>
);


const MyForm = () => {  
  return (
    <FormStateProvider>
      <FetchDispatcher
        url={`${TODOS_URL}?userId=2`}
        dispatchSelector={values => (
          updateFieldsAction({todoList:values})
        )}
      />
      <FormContextProvider name="myForm">
        <FieldArray
          name="todoList"
          component={RenderTodoList}
        />
        <FormStateSelector path="fieldValues.todoList"/>
      </FormContextProvider>
    </FormStateProvider>
  );
};

export default withDocs(readme, () => <MyForm/>);
