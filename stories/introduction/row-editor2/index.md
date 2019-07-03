# Row Editor2
This form populates a series of rows with data fetched from https://jsonplaceholder.typicode.com/users.

It uses the same data-components as the last example.

<!-- STORY -->
---
#### Code
```jsx
import React from 'react';
import FetchDispatcher from '../../data-components/fetch-dispatcher';
import RowEditor from '../../data-components/row-editor';
import RowCreator from '../../data-components/row-creator';
import FormStateSelector from '../../data-components/form-state-selector';
import {TextInput, NumberInput} from '../../ui-components';
import {
  FormStateProvider,
  FormContextProvider,
  Scope,
  FieldArray,
  updateFieldsAction
} from '../../../packages/react-form-composer/src';

const User = ({disabled=false, index}) => {
  return (
    <>
      <NumberInput
        disabled={true}
        name="id"
        id={`id${index}`}
        label="id"
      />
      <TextInput
        disabled={disabled}
        name="name"
        id={`name${index}`}
        required
        label="Name"
      />
      <TextInput
        disabled={disabled}
        name="username"
        id={`username${index}`}
        required
        label="Username"
      />
      <TextInput
        disabled={disabled}
        name="email"
        id={`email${index}`}
        required
        label="Email"
      />
      <Scope name ="address">
        <TextInput
          disabled={disabled}
          name="street"
          id={`street${index}`}
          required
          label="Street"
        />
        <TextInput
          disabled={disabled}
          name="suite"
          id={`suite${index}`}
          required
          label="Suite"
        />
        <TextInput
          disabled={disabled}
          name="city"
          id={`city${index}`}
          required
          label="City"
        />
        <TextInput
          disabled={disabled}
          name="zipcode"
          id={`zipcode${index}`}
          required
          label="ZipCode"
        />
        <Scope name="geo">
          <TextInput
            disabled={disabled}
            name="lat"
            id={`lat${index}`}
            required
            label="Latitude"
          />
          <TextInput
            disabled={disabled}
            name="lng"
            id={`lng${index}`}
            required
            label="Longitude"
          />
        </Scope>
      </Scope>
      <TextInput
        disabled={disabled}
        name="phone"
        id={`phone${index}`}
        required
        label="Phone"
      />
      <TextInput
        disabled={disabled}
        name="website"
        id={`website${index}`}
        required
        label="Website"
      />
      <Scope name="company">
        <TextInput
          disabled={disabled}
          name="name"
          id={`name${index}`}
          required
          label="Name"
        />
        <TextInput
          disabled={disabled}
          name="catchPhrase"
          id={`catchPhrase${index}`}
          required
          label="Catch Phrase"
        />
        <TextInput
          disabled={disabled}
          name="bs"
          id={`bs${index}`}
          required
          label="Bs"
        />
      </Scope>
    </>
  );
}

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const RenderUsers = ({fields: users}) => (
  <div>
    <h2>
      Users
    </h2>
    {users.map((user, index) => (
      <Scope key={index} name={user}>
        <RowEditor
          name={user}
          component={User}
          rowIndex={index}
          deleteRow={() => users.remove(index)}
          url={values=>`${USERS_URL}/${values.id}`}
        />
        <hr/>
      </Scope>
    ))}
    <RowCreator
      name="user"
      component={User}
      createRow={values => users.push(values)}
      url={USERS_URL}
    />
  </div>
);


const MyForm = () => {  
  return (
    <FormStateProvider>
      <FetchDispatcher
        url={USERS_URL}
        dispatchSelector={values => (
          updateFieldsAction({users:values})
        )}
      />
      <FormContextProvider name="myForm">
        <h4>Shortest Catchphrase:</h4>
        <FormStateSelector path="fieldValues.users" transform={(users=[])=>(
          users.reduce((prev, current)=>(
            (prev.length && prev.length < current.company.catchPhrase.length) ? prev: current.company.catchPhrase
          ), "")
        )}/>
        <FieldArray
          name="users"
          component={RenderUsers}
        />
        <FormStateSelector path="fieldValues.users"/>
      </FormContextProvider>
    </FormStateProvider>
  );
};

export default MyForm;
```
---
