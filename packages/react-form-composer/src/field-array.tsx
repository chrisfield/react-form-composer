import React, { useEffect, useRef, memo } from 'react';
import { pushToFieldArray, removeFromFieldArray } from './actions.ts';
import { useForm } from './form.tsx';
import useFieldArray from './use-field-array.ts';

const FieldArrayComponent = (props: any) => {
  const fields = {
    map: (callback: Function) => (
      (props.fields || []).map((_item: any, index: number) =>
        callback(`${props.name}[${index}]`, index),
      )
    ),
    name: props.name,
    push: props.push,
    remove: props.remove,
  };

  const {component: Component, ...rest} = props;
  if (!Component) {
    return null
  }
  return <Component {...rest} fields={fields} />;
}

const FieldArray = ({name, ...props}: any) => {
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
  name,
  dispatch,
  fields,
  status, 
  formState,
  ...props
}: any) => {
  
  const fieldArrayApiRef: any = useRef({
    name
  });

  useEffect(() => {
    fieldArrayApiRef.current.fields = fields;
  });

  const formApi = useForm();
  useEffect(() => {
    formApi.registerFieldArray(fieldArrayApiRef.current);
    return () => {
      formApi.deregisterFieldArray(fieldArrayApiRef.current);
    }
  }, []);

  const push = () => {
    dispatch(pushToFieldArray({})); 
  };

  const remove = (index: number) => {
    dispatch(removeFromFieldArray(index));
  }

  return (
    <FieldArrayComponent
      fields={fields}
      name={name}
      push={push}
      remove={remove}
      {...props}
    />
  );
},(prevProps, nextProps)=>(
  prevProps.fields === nextProps.fields
));

export default FieldArray;