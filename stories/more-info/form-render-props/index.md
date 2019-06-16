# Forms with Render Prop / Child Function
The `Form` component, like `Field`, can also render a component, a render prop or a render function as child.

#### Component prop
This will render a div rather than a form.
```jsx
const MyForm = () => {  
  return (
    <FormStateProvider>
      <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues} component="div">
        <div>
          <label>First name: <Field name="firstName" component="input"/></label>
        </div>
        <Field name="lastName" validate={requiredStr} label="Last Name:">
          {({name, value, error, touched, handleChange, handleBlur, label}) => (
            <div>
              <label htmlFor={name}>{label}</label>
              <input id={name} value={value} onChange={handleChange} onBlur={handleBlur}/>
              {touched && error && <p>{error}</p>}
            </div>
          )}
        </Field>
        <button>Submit</button>
        <TheFormState/>
      </Form>
    </FormStateProvider>
  );
};
```

#### Render prop
```jsx
const MyForm = () => {  
  return (
    <FormStateProvider>
      <Form name="myForm" initialValues={{rb2: 'G'}} onSubmit={submitValues} onSubmitSuccess={clearValues}
        render={({handleSubmit}) => (
          <div style={{ flex: 1, marginRight: '2rem' }}>
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
            <Button onClick={handleSubmit}/>
          </div>
        )}
      />
    </FormStateProvider>
  );
};

```

#### Child render function
```jsx
const MyForm = () => {  
  return (
    <FormStateProvider>
      <Form name="myForm" initialValues={{rb2: 'G'}} onSubmit={submitValues} onSubmitSuccess={clearValues}>
        {({handleSubmit}) => (
          <div style={{ flex: 1, marginRight: '2rem' }}>
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
            <Button onClick={handleSubmit}/>
          </div>
        )}
      </Form>
    </FormStateProvider>
  );
};

```
---
<!-- STORY -->

