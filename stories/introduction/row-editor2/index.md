# Row Editor2
This form populates a series of rows with data fetched from https://jsonplaceholder.typicode.com/users.

It uses the same [data-components](https://github.com/chrisfield/react-form-composer/tree/master/stories/data-components) as the last example.

---
#### Code
```jsx
import React from 'react';
import RestApiCrudForm from '../../data-components/rest-api-crud-form';
import {TextInput, NumberInput} from '../../custom-ui-components';
import { Scope } from 'react-form-composer';

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
const MyForm = () => (
  <RestApiCrudForm
    name="users"
    resourceUrl={USERS_URL}
    inputComponent={User}
  />
);

export default MyForm;
```
---

<!-- STORY -->
