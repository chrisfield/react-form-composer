import React, { memo } from 'react';
import { useForm } from './form';

const FormSpyBase = memo(({state, children}) => {
  return children(state)
});

const FormSpy = ({selector, children}) => {
  const {state} = useForm();
  const selectedState = selector(state);
  return <FormSpyBase children={children} state={selectedState}/>
}

export default FormSpy;
