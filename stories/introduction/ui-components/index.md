# Writing ui-Components

The built-in ui-components make it easy to get started when you want to write forms with the standard html controls. These built-in components are written using the react-form-composer `Field` api so you might want to copy and adapt their code when writing your own controls:
* [Text](https://github.com/chrisfield/react-form-composer/blob/master/packages/react-form-composer/src/ui-components/text.js)
* [TextArea](https://github.com/chrisfield/react-form-composer/blob/master/packages/react-form-composer/src/ui-components/text-area.js)
* [RadioGroup and Radio](https://github.com/chrisfield/react-form-composer/blob/master/packages/react-form-composer/src/ui-components/radio.js)
* [Checkbox](https://github.com/chrisfield/react-form-composer/blob/master/packages/react-form-composer/src/ui-components/checkbox.js)
* [Select](https://github.com/chrisfield/react-form-composer/blob/master/packages/react-form-composer/src/ui-components/select.js)
* [ValidationMessage](https://github.com/chrisfield/react-form-composer/blob/master/packages/react-form-composer/src/ui-components/validation-message.js)


## Example custom control: NumberInput
The form below includes a custom `NumberInput` that accepts integers and shows the value formatted to the locale eg with commas separating in UK (1,000,000).

Note: If you have ever tried formatting fields in React you will know that the curor position is often reset placing the cursor at the end of the entered text/digits. `NumberInput` includes code to retain the cursor position.

The `NumberInput` also accepts a label property which it uses for the label and includes in the *'required'* error message.

```
<NumberInput name="age" required label="Age"/
```

<!-- STORY -->

---
#### Code
```jsx
const InputWrapper = ({label, id, name, touched, error, children}) => (
  <div>
    <label htmlFor={id + name}>{label || name}</label>
    {children}
    {touched && error && <p>{error}</p>}
  </div>
);

const NumberInputComponent = ({
  label,
  disabled,
  name,
  id,
  value,
  handleChange,
  handleBlur,
  elementRef,
  touched,
  error,
  placeholder,
  children
}) => 
{
  return (
    <InputWrapper {...{name, id, label, touched, error}}>
      <input
        id={id + name}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        ref={elementRef}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
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
  if (Number.isNaN(num)) {
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
    defaultValue={null}
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

#### Notes

The functions for `formatFromStore` and `formatToStore` are fairly self explaintary. 

Any function you pass as a `beforeUpdate` prop will be called with the field, the old value and the new value. Whatever your `beforeUpdate` function returns will be passed to any `afterUpdate` as the 2nd param (the 1st param being the field). In the code below I use `beforeUpdate` and `afterUpdate` to keep the cursor position.

