import React from 'react';
import FetchDispatcher from './fetch-dispatcher';
import FormStateSelector from './form-state-selector';
import RenderRows from './render-rows';
import {
  Form,
  FieldArray,
  updateFieldsAction
} from '../../packages/react-form-composer/src'

const RestApiCrudForm = ({
  name,
  resourceUrl,
  urlForRead=resourceUrl,
  inputComponent
}) => {
  return (
    <Form component="div">
      <FetchDispatcher
        url={urlForRead}
        formName="restApiCrudForm"
        dispatchSelector={values => {
          console.log({[name]: values});
          return updateFieldsAction({[name]: values});
        }}
      />
      <FieldArray
        name={name}
        component={RenderRows}
        inputComponent={inputComponent}
        resourceUrl={resourceUrl}
      />
      <FormStateSelector path={`fieldValues.${name}`}/>
    </Form>
  );
};

export default RestApiCrudForm;
