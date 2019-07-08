import React from 'react';
import RowEditor from './row-editor';
import RowCreator from './row-creator';
import {
  Scope
} from '../../packages/react-form-composer/src';
import { borderStyle } from 'polished';

const focusOnFirstField = formApi => {
  const fields = formApi.getFields();
  for (let field of fields) {
    if (field.element && !field.element.disabled && field.element.focus) {
      field.element.focus();
      return;
    }
  }
};
const RenderRows = ({fields, resourceUrl, inputComponent: InputComponent}) => (
  <>
    <div style={containerStyles}>
      {fields.map((field, index) => (
        <div style={itemStyles}>
          <div style={{padding: '5px'}}>
            <Scope key={index} name={field}>
              <RowEditor
                name={field}
                component={InputComponent}
                rowIndex={index}
                deleteRow={() => fields.remove(index)}
                url={values=>`${resourceUrl}/${values.id}`}
                onMount={focusOnFirstField}
              />
            </Scope>
          </div>
        </div>
      ))}
    </div>
    <RowCreator
      name="row"
      component={InputComponent}
      createRow={values => fields.push(values)}
      url={resourceUrl}
      onMount={focusOnFirstField}
    />
  </>
);

const containerStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  borderWidth: '2px 0 0 2px',
  borderColor: 'blue',
  borderStyle: 'solid',
  justContent: 'space-between'
};

const itemStyles = {
  borderWidth: '0 2px 2px 0',
  borderColor: 'blue',
  borderStyle: 'solid',
  flex: '1'
};
export default RenderRows;
