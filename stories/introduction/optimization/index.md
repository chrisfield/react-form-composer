# Optimization
With Field and FormSpy only the components that need updating re-render as the form's state changes. This page shows the various render counts so you can see this in practice.

<!-- STORY -->

---
#### Code
```jsx
import React from 'react';
import {Form, Field, FieldArray, FormSpy, Scope, useForm} from 'react-form-composer';
import {RenderCount} from '../../custom-ui-components';

const TheFormState = () => {
  const {state} = useForm();
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

const TextInput = ({name, validate, label, defaultValue=""}) => (
  <Field name={name} validate={validate} defaultValue={defaultValue} render={
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
const RadioButton = ({selected, value, ...props}) => (
  <Field
    defaultValue={selected? value: undefined}
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
    <Form name="myForm" initialValues={{shoppingList:['Bread']}} onSubmit={submitValues} onSubmitSuccess={clearValues}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, marginRight: '2rem' }}>
          <RenderCount name="Whole form">
            <TextInput defaultValue="Bob" name="firstName" label="First Name" validate={requiredStr}/>
            <TextInput name="middleName" label="Middle Name"/>
            <TextInput name="lastName" label="Last Name" validate={requiredStr}/>
            <Scope name="relationshipStatus">
                Are You Single?
                <RadioButton selected value="SINGLE" label="Yes"/>
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
  );
};

function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearValues(form) {
  form.updateFields({});
}

export default MyForm;
```
