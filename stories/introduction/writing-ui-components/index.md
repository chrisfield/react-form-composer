# Writing ui-Components

The built-in ui-components provided with react-form-composer are written using the `Field` api. Links to the source code are listed below:

* [Text](https://github.com/chrisfield/react-form-composer/blob/master/packages/react-form-composer/src/ui-components/text.js)
* [TextArea](https://github.com/chrisfield/react-form-composer/blob/master/packages/react-form-composer/src/ui-components/text-area.js)
* [RadioGroup and Radio](https://github.com/chrisfield/react-form-composer/blob/master/packages/react-form-composer/src/ui-components/radio.js)
* [Checkbox](https://github.com/chrisfield/react-form-composer/blob/master/packages/react-form-composer/src/ui-components/checkbox.js)
* [Select](https://github.com/chrisfield/react-form-composer/blob/master/packages/react-form-composer/src/ui-components/select.js)
* [ValidationMessage](https://github.com/chrisfield/react-form-composer/blob/master/packages/react-form-composer/src/ui-components/validation-message.js)

The built-in ui-components may meet your requirements but it's easy to write custom ui-components and often doing this will simplify your forms and save repetition. There are two ways you could write custom components:
* use the `Field` component say by copying and adapting the code from one of the build-in components (they also use the `Field` component).
* Embed a built-in component in your own component to change what it does and how it looks. 

The second of these techniques is simpler and has the advantage that it reuses the code from the built-in ui component. The form below makes use of two custom components: `SelectInput` and `NumberInput`. These custom inputs add and alter the behaviour and presentation of the `Select` and `Text` built-in ui-components they contain.

```
<SelectInput name="frequency" label="How often do you eat noodles" required>
  <option value="" disabled>
    Select One...
  </option>
  <option value="daily">Daily</option>
  <option value="weekly">Weekly</option>
  <option value="monthly">Monthly</option>
</SelectInput>
<NumberInput name="age" required label="Age"/>
```
<!-- STORY -->

## Example custom control: SelectInput
This custom written [`SelectInput`](https://github.com/chrisfield/react-form-composer/blob/master/stories/ui-components/select-input.jsx) simply provides a wrapper around the built-in `Select` ui-component. The wrapper renders a label, the built-in `Select` and any validation message.

#### Code
```jsx
import React from 'react';
import { Select } from 'react-form-composer';
import {combineValidation, requiredStrWithName, LabelledField} from './utils';

const SelectInput = ({label, validate, ...props}) => (
  <LabelledField
    name={props.name}
    label={label || props.name}
    field={
      <Select
        validate={props.required ? combineValidation(requiredStrWithName(label || props.name), validate): validate}
        {...props}
      />
    }
  />
);

export default SelectInput;
```

---
## Example custom control: NumberInput
The custom written [`NumberInput`](https://github.com/chrisfield/react-form-composer/blob/master/stories/ui-components/number-input.jsx) can be used for integers. It shows the value formatted to the locale: e.g with commas separating the thousands like 1,000,000.

Note: If you have ever tried formatting fields in React you will know that the cursor position is often reset placing it at the end of the entered text/digits. `NumberInput` includes code to retain the cursor position.

The `NumberInput` also accepts a label property which it uses for the label and includes in the *'required'* error message.

#### Code
```jsx
import React from 'react';
import { Text } from 'react-form-composer';
import {combineValidation, LabelledField} from './utils';

const requiredNumWithName = name => (
  (value) => {
    if (value === null || isNaN(value)) {
      return `Please enter a value for ${name.toLowerCase()}`;
    }
      return undefined;
  }
);

const strToNumber = str => {
  const num = parseInt(str.replace(/[^\d.-]/g, ""), 10);
  if (Number.isNaN(num)) {
    return undefined;
  }
  return num;
};

const numberToStr = number => {
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

const NumberInput = ({label, validate, ...props}) => (
  <LabelledField
    name={props.name}
    label={label || props.name}
    field={
      <Text
        defaultValue={null}
        formatFromStore={numberToStr}
        formatToStore={strToNumber}
        beforeUpdate={getNextCursorPosition}
        afterUpdate={setCursorPosition}
        validate={props.required ? combineValidation(requiredNumWithName(label || props.name), validate): validate}
        {...props}
      />
    }
  />
);

export default NumberInput;
```
---

#### Notes

The functions for `formatFromStore` and `formatToStore` are fairly self explaintary. 

Any function you pass as a `beforeUpdate` prop will be called with the field, the old value and the new value. Whatever your `beforeUpdate` function returns will be passed to any `afterUpdate` as the 2nd param (the 1st param being the field). In the code below I use `beforeUpdate` and `afterUpdate` to keep the cursor position.

