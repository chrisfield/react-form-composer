import React from 'react';
import {Form, useForm} from './form';
import {SubFormStateProvider} from './form-state-provider';
import {updateFieldAction} from './index';

const Formlet = ({name, children}) => {
  const {name: formName} = useForm();
  return (
    <div>
      <SubFormStateProvider>
        <Form
          name={formName}
          onSubmit={()=>{}}
          onSubmitSuccess={formApi => {
            console.log(formApi);
            console.log(name, formApi.state.fieldValues.todoList);
            formApi.dispatchToParent(updateFieldAction(name,
              formApi.state.fieldValues.todoList[0])
            )}
          }
        >
          {children}
        </Form>
      </SubFormStateProvider>
    </div>
  );  
};

export default Formlet;
