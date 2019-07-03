import 'isomorphic-unfetch';
import React from 'react';
import { getStateValueByPath, useForm, useFormReducer } from '../../packages/react-form-composer/src';

const DeleteButton = ({deleteRow, rowName, url}) => {
  const [state] = useFormReducer(useForm().name);
  const rowValues = getStateValueByPath(state.fieldValues, rowName);
  const handleDelete = () => {
    console.log('Call endpoint here to delete row:', rowValues);
    fetch(url(rowValues), {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(json => console.log('Server response', json));
    deleteRow();
  };
  return <button onClick={handleDelete}>Confirm Delete</button>
};

export default DeleteButton;
