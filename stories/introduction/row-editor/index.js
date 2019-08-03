import { withDocs } from 'storybook-readme';
import readme from './index.md'
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
const Form = () => (
  <RestApiCrudForm
    name="todoList"
    resourceUrl={TODOS_URL}
    urlForRead={`${TODOS_URL}?userId=${USER_ID}`}
    inputComponent={Todo}
  />
);

export default withDocs(readme, Form);
