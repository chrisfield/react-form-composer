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
  deleteRow
}) => {
  const [isActive, setActive] = useState(false);
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
    setActive(false);
  };

  const handleDelete = () => {
    deleteRow();
    setDeleting(false);
  };

  if (isActive) {
    return (
      <div>
        <Formlet onSubmit={handleSubmit} onSubmitSuccess={handleSubmitSuccess}>
          <ButtonWithCancel text="Edit" isActive={isActive} setActive={setActive}/>
          <SaveButton/>
          <RowComponent index={rowIndex}/>
        </Formlet>
      </div>
    );    
  }

  if (isDeleting) {
    return (
      <div>
        <DeleteButton deleteRow={handleDelete} rowName={rowName} url={url}/>
        <ButtonWithCancel text="Delete" isActive={isDeleting} setActive={setDeleting}/>
        <RowComponent index={rowIndex} disabled/>
      </div>
    );      
  }

  return (
    <div>
      <ButtonWithCancel text="Edit" isActive={isActive} setActive={setActive}/>
      <ButtonWithCancel text="Delete" isActive={isDeleting} setActive={setDeleting}/>
      <RowComponent index={rowIndex} disabled/>
    </div>
  );
}

export default RowEditor;