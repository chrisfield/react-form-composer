import React, { memo } from 'react';
import useFormReducer from './use-form-reducer';
import { useForm } from './form';

const FormSpyBase = memo(({state, children}) => {
  return children(state)
});

const FormSpy = ({selector, children}) => {
  const [state] = useFormReducer(useForm().name, selector);
  return <FormSpyBase children={children} state={state}/>
}

export default FormSpy;
