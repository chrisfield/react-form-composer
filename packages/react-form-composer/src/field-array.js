import React, { memo } from 'react';
import { pushToFieldArray, removeFromFieldArray } from './actions';
import useFieldArray from './use-field-array';

const FieldArray = ({name, ...props}) => {
  const connectionProps = useFieldArray(name);
  return (
    <FieldArrayBase
      name={name}
      {...props}
      {...connectionProps}
    />
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