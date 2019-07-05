import React from 'react';
import FetchDispatcher from './fetch-dispatcher';
import FormStateSelector from './form-state-selector';
import RenderRows from './render-rows';
import {
  FormStateProvider,
  FormContextProvider,
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
    <FormStateProvider>
      <FetchDispatcher
        url={urlForRead}
        formName="restApiCrudForm"
        dispatchSelector={values => (
          updateFieldsAction({[name]:values})
        )}
      />
      <FormContextProvider name="restApiCrudForm">
        <FieldArray
          name={name}
          component={RenderRows}
          inputComponent={inputComponent}
          resourceUrl={resourceUrl}
        />
        <FormStateSelector path={`fieldValues.${name}`}/>
      </FormContextProvider>
    </FormStateProvider>
  );
};

export default RestApiCrudForm;
