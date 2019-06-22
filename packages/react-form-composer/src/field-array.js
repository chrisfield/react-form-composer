import React, { memo } from 'react';
import { pushToFieldArray, removeFromFieldArray } from './actions';
import FormSpy from './form-spy';
import { useForm } from './form';
import getField from './state-utils/get-field';

const FieldArray = ({name, ...props}) => {
  const { dispatch: formDispatch } = useForm();
  const dispatch = (action) => {
    formDispatch({fieldArray: name, ...action });
  };
  const fieldArraySelector = state => getField(state.fieldValues, name);
  return (
    <FormSpy selector={fieldArraySelector}>
      {(fields) => (
        <FieldArrayBase
          name={name}
          {...props}
          dispatch={dispatch}
          fields={fields}
        />)
      }
    </FormSpy>
  );
};

const FieldArrayBase = memo(({
  dispatch,
  fields,
  component,
  name,
  ...props
}) => {
  const push = (values) => {
    dispatch(pushToFieldArray(values)); 
  };

  const remove = (index) => {
    dispatch(removeFromFieldArray(index));
  }

  if (!component) {
    return null
  }

  const augmentedFields = {
    map: (callback) => (
      (fields || []).map((_item, index) =>
        callback(`${name}[${index}]`, index),
      )
    ),
    push,
    remove,
  };

  const Component = component;
  return <Component {...props} fields={augmentedFields} />;
});

export default FieldArray;