import 'isomorphic-unfetch';
import React, {useState} from 'react';
import { getStateValueByPath, useForm, updateFieldAction } from '../../packages/react-form-composer/src';
import Formlet from './formlet';
import ButtonWithCancel from './button-with-cancel';
import SaveButton from './save-button'
import DeleteButton from './delete-button'

const RowEditor = ({
  name: rowName,
  component: RowComponent,
  rowIndex,
  url,
  deleteRow,
  onMount,
  onUnmount
}) => {
  const [isEditing, setEditing] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const {dispatch} = useForm();

  const handleSubmit = (fieldValues)=> {
    const rowValues = getStateValueByPath(fieldValues, rowName);
    console.log('Call endpoint here to update row:', rowValues);
    fetch(url(rowValues), {
      method: 'PUT',
      body: JSON.stringify(rowValues),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => console.log('Server response', json));
  };

  const handleSubmitSuccess = formApi => {
    dispatch(updateFieldAction(rowName, getStateValueByPath(formApi.state.fieldValues, rowName)));
    setEditing(false);
  };

  const handleDelete = () => {
    deleteRow();
    setDeleting(false);
  };

  let content;

  if (isEditing) {
    content = (
      <Formlet
      onSubmit={handleSubmit}
      onSubmitSuccess={handleSubmitSuccess}
      onMount={onMount}
      onUnmount={onUnmount}
      >
        <ButtonWithCancel text="Edit" isActive={true} setActive={setEditing}/>
        <SaveButton/>
        <RowComponent index={rowIndex}/>
      </Formlet>
    );
  } else if (isDeleting) {
    content = (
      <div>
        <DeleteButton deleteRow={handleDelete} rowName={rowName} url={url}/>
        <ButtonWithCancel text="Delete" isActive={isDeleting} setActive={setDeleting}/>
        <RowComponent index={rowIndex} disabled/>
      </div>
    );      
  } else {
    content = (
      <div>
        <ButtonWithCancel text="Edit" isActive={false} setActive={setEditing}/>
        <ButtonWithCancel text="Delete" isActive={false} setActive={setDeleting}/>
        <RowComponent index={rowIndex} disabled/>
      </div>
    );      
  }

  return (
    <div>
      Row: {(rowIndex + 1) + ''}
      {content}
    </div>
  );
}

export default RowEditor;