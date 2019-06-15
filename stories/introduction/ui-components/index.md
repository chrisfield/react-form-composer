# UI-Components
Ui-components like `Checkbox`, `RadioButton`, `TextInput` and  `NumberInput` make it quick and easy to write reliable, consistent forms.

Form frameworks typically come with these built-in. Many also include component specific code like `if (type === "checkbox") {/* do checkbox stuff */}`

`react-form-composer` takes an alternative approach: it provides just the one ui-component - `Field` together with an api that aims to make it easy for you to define any other ones you want.

This makes for a smaller, cleaner codebase, it leaves you in control over your own ui-components and, with example ui-components, it is still quick and easy to get started.

Take a look at some example ui-components. It is easy to copy or adapt these to meet your exact requirements. You can learn more about how ui-components are defined by looking at the `Field` api.

<!-- STORY -->

---
#### Code
```jsx
import React from 'react';
import {FormStateProvider, Form, useForm, useFormReducer} from 'react-form-composer';
import {TextInput, NumberInput, Checkbox, RadioButton} from '../ui-components';

const SubmitButton = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <button style={{backgroundColor: state.formStatus.isValid? 'green': 'cyan'}} >Submit</button>
  );
};

const MyForm = () => {  
  return (
    <FormStateProvider>
      <Form name="myForm" initialValues={{rb2: 'G'}} onSubmit={submitValues} onSubmitSuccess={clearValues}>
        <div>
          <TextInput name="fieldOne" label="Field One" required/>
          <NumberInput name="age" label="Age"/>
          <Checkbox name="isAgreed" label="Do you agree?"/>
        </div>
        <div>
          <RadioButton name="rb2" label="Red" value="R" />
          <RadioButton name="rb2" label="Green" value="G" />
          <RadioButton name="rb2" label="Blue" value="B" />
        </div>
        <SubmitButton/>
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

export default MyForm;
```
---

## Example UI-Components (for reference)

#### InputWrapper
This is more of a helper for other UI components. Most likely you will want change things (add class-names for styling etc). Note that Field and Form props that react-form-composer does not know about are passed through - label is an example of this.

```jsx
import React from 'react';

const InputWrapper = ({label, name, touched, error, children}) => (
  <div>
    <label htmlFor={name}>{label || name}</label>
    {children}
    {touched && error && <p>{error}</p>}
  </div>
);

export default InputWrapper;
```


#### TextInput
You have already seen `Field` used with 'input' passed to the component prop. Here I've defined a `TextInputComponent` and passed this as the component. I've written this example `TextInput` so you can pass a `required` prop plus any additional validation. Note I have not passed the `required` prop on to the underlying input for HTML5 validation and ,as a writter of a lightweight framework, I'm glad to leave you in control of these decisions.

```jsx
import React from 'react';
import {Field} from 'react-form-composer';
import InputWrapper from './input-wrapper.jsx';

const TextInputComponent = ({
  label,
  name,
  value,
  handleChange,
  handleBlur,
  elementRef,
  touched,
  error,
  children,
  ...props}) => 
(
    <InputWrapper {...{name, label, touched, error}}>
      <input
        id={name}
        ref={elementRef}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
      {children}
    </InputWrapper>
);

const requiredStr = (value, _values, {label}) => {
  return value && value.trim && value.trim().length > 0 ? undefined: `Please enter a value for ${label.toLowerCase()}`
};

function combineValidation(validate1, validate2) {
  if (!validate1) {
    return validate2;
  }
  if (!validate2) {
    return validate1;
  }
  const v1Array = Array.isArray(validate1) ? validate1: [validate1];
  const v2Array = Array.isArray(validate2) ? validate2: [validate2];
  return v1Array.concat(v2Array);
}

export const TextInput = ({required, validate, ...props}) => {
  const combinedValidate = required ? combineValidation(requiredStr, validate): validate;
  return <Field
    component={TextInputComponent}
    validate={combinedValidate}
    {...props}
  />
}

export default TextInput;
```

---
#### NumberInput
There are quite a few simularities between this and the `TextInput` above plus I'd say the functions for `formatFromStore` and `formatToStore` are fairly self explaintary. Any function you pass as a `beforeUpdate` prop will be called with the field, the old value and the new value. Whatever your `beforeUpdate` function returns will be passed to any `afterUpdate` as the 2nd param (the 1st param being the field). In the code below I use `beforeUpdate` and `afterUpdate` to keep the cursor position.


```jsx
import React from 'react';
import {Field} from 'react-form-composer';
import InputWrapper from './input-wrapper.jsx';

const NumberInputComponent = ({
  label,
  name,
  value,
  handleChange,
  handleBlur,
  elementRef,
  touched,
  error,
  children,
  ...props}) => 
{
  return (
    <InputWrapper {...{name, label, touched, error}}>
      <input
        id={name}
        ref={elementRef}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
      {children}
    </InputWrapper>
  );
};

const requiredNum = (value, _values, field) => {
  if (value === null || isNaN(value)) {
    return `Please enter a value for ${field.label.toLowerCase()}`;
  }
  return undefined;
};

const number = str => {
  const num = parseInt(str.replace(/[^\d.-]/g, ""), 10);
  if (num === null) {
    return undefined;
  }
  return num;
};

const addCommas = number => {
  if (number === 0) {
    return '0';
  }
  if (!number) {
    return '';
  }
  return number.toLocaleString();
};


export const getNextCursorPosition = ({element}, value, nextValue) => {
  let cursorPosition = element.selectionStart;
  if (nextValue.length === value.length + 2) { // + 2 is for digit and comma
    cursorPosition++;
  }
  return cursorPosition;
}

export const setCursorPosition = ({element}, cursorPosition) => {
  if (cursorPosition !== undefined && element.setSelectionRange) {
    element.setSelectionRange(cursorPosition, cursorPosition);
  }  
}

export const NumberInput = ({required, ...props}) => {
  return <Field
    component={NumberInputComponent}
    validate={required? requiredNum: undefined}
    formatFromStore={addCommas}
    formatToStore={number}
    beforeUpdate={getNextCursorPosition}
    afterUpdate={setCursorPosition}
    {...props}
  />
};

export default NumberInput;
```

---
#### Checkbox
A `Checkbox` component is easy to define. The `getTargetValue` tells `react-form-composer` how to get the boolean value to save in the form state.


```jsx
import React from 'react';
import {Field} from 'react-form-composer';

const isChecked = target => target.checked;

const CheckboxComponent = props => (
  <div>
    <label htmlFor={props.name}>{props.label}</label>
    <input id={props.name} ref={props.elementRef} type="checkbox" checked={props.value} onChange={props.handleChange}/>  
  </div>
);

const Checkbox = props => (
  <Field component={CheckboxComponent} getTargetValue={isChecked} {...props} />
);

export default Checkbox;
```

---
#### RadioButton
The `RadioButton` component is similar to Checkbox. The `useTargetCondition` tells `react-form-composer` to get the targetValue if and only if the button is checked.

```jsx
import React from 'react';
import {Field} from 'react-form-composer';

const isChecked = target => target.checked;
  
const RadioButtonComponent = props => {
  const id = `${props.name}-${props.radioValue}`;
  return (
    <div>
      <input id={id} type="radio" ref={props.elementRef} name={props.name} value={props.radioValue} checked={props.radioValue===props.value} onChange={props.handleChange}/>
      <label htmlFor={id}>{props.label}</label>
    </div>
  );
};

const RadioButton = props => (
  <Field
    component={RadioButtonComponent}
    name={props.name}
    radioValue={props.value}
    useTargetCondition={isChecked}
    label={props.label}
  />
);

export default RadioButton;
```