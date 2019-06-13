# React Native

`React-form-composer` is light-weight, does not depend on react-dom and is hightly suited for use with react-native.

Checkout the [with_react_native](https://github.com/chrisfield/react-form-composer/tree/master/examples/with_react_native) example.

---
``` jsx
import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {FormStateProvider, Form, useFormReducer, useForm} from 'react-form-composer';
import TextField from './components/form-controls/text-field';
import RadioButton from './components/form-controls/radio-button';

const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <Text>
      {JSON.stringify(state, null, 2)}
    </Text>
  );
};

export default  () => {
  return (
    <FormStateProvider>
      <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearFormValues}>
        {({handleSubmit})=> (
          <View>
            <TextField name="myField" label="A text field:"/>
            <View style={styles.radioGroup}>
              <RadioButton name="howMany" label="Option One" value="one"/>
              <RadioButton name="howMany" label="Option Two" value="two"/>
            </View>
            <TouchableHighlight onPress={handleSubmit}>
              <Text>Submit</Text>
            </TouchableHighlight>
            <TheFormState/>
          </View>
        )}
      </Form>
    </FormStateProvider>
  );
};

function submitValues(values) {
  alert(`You submitted:${JSON.stringify(values, null, 2)}`);
}

function clearFormValues(form) {
  form.updateFields({howMany: 'one'});
}
```