import { withDocs } from 'storybook-readme';
import readme from './index.md'

import React from 'react';
import {FormStateProvider, Form, Field, FieldArray, FormSpy, Scope, useFormReducer, useForm} from '../../../packages/react-form-composer/src';
import {RenderCount} from '../../ui-components';

const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <RenderCount name="TheFormState">
      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </RenderCount>
  );
};

const isValidSelector = state => state.formStatus.isValid;
const Button = (props) => (
  <FormSpy selector={isValidSelector}>
    {(isValid) => (
      <RenderCount>
        <button {...props} style={{backgroundColor: isValid? 'green': 'cyan'}} >Submit</button>
      </RenderCount>
    )}
  </FormSpy>
);

const requiredStr = (value) => {
  return value && value.trim && value.trim().length > 0 ? undefined: 'Please enter a value'
};

const TextInput = ({name, validate, label}) => (
  <Field name={name} validate={validate} render={
    ({name, value, handleChange, handleBlur, error, touched, elementRef}) => {
      return <>
        <label>
          <RenderCount>
              {label}
              <input value={value} name={name} onChange={handleChange} onBlur={handleBlur} ref={elementRef}/>
          </RenderCount>
        </label>
        {touched && error && <div>{error}</div>}
      </>
    }
  }/>
);

const RenderShoppingList = ({fields}) => (
  <fieldset>
    <legend className="example-form_title">
      Shopping List
    </legend>
    {fields.map((item, index) => (
      <div key={index}>
        <TextInput label="Item" name={item} validate={requiredStr}/>
        <button type="button" title="Remove Item" onClick={() => fields.remove(index)}>-</button>
        <hr/>
      </div>
    ))}
    <button type="button" onClick={() => fields.push()}>Add Item</button>
  </fieldset>
);

const relationshipStatusSelector = state=>state.fieldValues.relationshipStatus;
const PartnerName = (props) => {
  return (
    <FormSpy selector={relationshipStatusSelector}>
      {relationshipStatus => {
        if (relationshipStatus === "NOT-SINGLE") {
          return (
            <TextInput name="partnerName" validate={requiredStr} {...props}/>
          );
        }
      }}
    </FormSpy>
  )
};

const isChecked = target => target.checked;
const RadioButton = ({value, ...props}) => (
  <Field
    radioValue={value}
    ignoreTargetValueUnless={isChecked}
    {...props}
  >
    {props => {
      const id = `${props.name}-${props.radioValue}`;
      return (
        <RenderCount>
          <input id={id} type="radio" ref={props.elementRef} name={props.name} value={props.radioValue} checked={props.radioValue===props.value} onChange={props.handleChange}/>
          <label htmlFor={id}>{props.label}</label>
        </RenderCount>
      );
    }}
  </Field>
);

const MyForm = () => {
  return (
    <FormStateProvider>
      <Form name="myForm" initialValues={{relationshipStatus: 'SINGLE', shoppingList:['Bread']}} onSubmit={submitValues} onSubmitSuccess={clearValues}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, marginRight: '2rem' }}>
            <RenderCount name="Whole form">
              <TextInput name="firstName" label="First Name"/>
              <TextInput name="middleName" label="Middle Name"/>
              <TextInput name="lastName" label="Last Name" validate={requiredStr}/>
              <Scope name="relationshipStatus">
                  Are You Single?
                  <RadioButton value="SINGLE" label="Yes"/>
                  <RadioButton value="NOT-SINGLE" label="No"/>
                </Scope>
                <PartnerName label="Partner Name"/>          
              <FieldArray name="shoppingList" component={RenderShoppingList}/>
              <Button/>
            </RenderCount>
          </div>
          <div style={{flex: 2, flexDirection: 'column', display: 'flex', minWidth: '300px'}}>
            <TheFormState/> 
          </div>
        </div>
      </Form>
    </FormStateProvider>
  );
};

function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearValues(form) {
  form.updateFields({});
}

export default withDocs(readme, () => <MyForm/>);
