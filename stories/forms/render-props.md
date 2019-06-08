# Render Prop / Child Function 
The simple form in the introduction rendered normal jsx nodes including `Fields` as children of a `Form` node. This section shows two other ways you can use to render forms: Render prop and Child render functions.

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

