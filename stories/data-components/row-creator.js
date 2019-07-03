import 'isomorphic-unfetch';
import React, {useState} from 'react';
import { Scope, getStateValueByPath } from '../../packages/react-form-composer/src';
import Formlet from './formlet';
import ButtonWithCancel from './button-with-cancel';
import SaveButton from './save-button';

const RowCreator = ({createRow, component: RowComponent, url, name: rowName}) => {
  const [isActive, setActive] = useState(false);
  const handleSubmitSuccess = () => {
    setActive(false);
  };

  const handleSubmit = (fieldValues) => {
    const values = getStateValueByPath(fieldValues, rowName)
    fetch(url, {
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
          onSubmit={handleSubmit}
          onSubmitSuccess={handleSubmitSuccess}
        >
          <ButtonWithCancel text="Create" isActive={isActive} setActive={setActive}/>
          <SaveButton/>
          <Scope name={rowName}>
            <RowComponent/>
          </Scope>
        </Formlet>
      </div>
    );
  }

  return (
    <ButtonWithCancel text="Create" isActive={isActive} setActive={setActive}/>
  );
};

export default RowCreator;