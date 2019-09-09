# Forms with Render Prop / Child Function
The `Form` component, like `Field`, can also render a component, a render prop or a render function as child.

#### Component prop
This will render a div rather than a form.
```jsx
<Form component="div">
...
</Form>
  );
};
```

#### Render prop
```jsx
const MyForm = () => {  
  return (
    <Form 
      name="myForm"
      initialValues={{rb2: 'G'}}
      onSubmit={submitValues}
      onSubmitSuccess={clearValues}
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
  );
};

```

#### Child render function
```jsx
const MyForm = () => {  
  return (
    <Form 
      name="myForm"
      initialValues={{rb2: 'G'}}
      onSubmit={submitValues}
      onSubmitSuccess={clearValues}
    >
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
  );
};

```
---
<!-- STORY -->

