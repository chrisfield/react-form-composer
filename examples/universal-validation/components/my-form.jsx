import React from 'react';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import {createFormDataHandler, getFieldDefinitionsByName} from '../form-data-handler';
import {TextInput, NumberInput, RadioButton, Checkbox} from './form-controls'; 
import { 
  Form,
  Scope,
  FieldArray,
  useForm,
  useField,
  useFormReducer
} from 'react-form-composer';

import {
  upper,
  lower,
  strToNumber,
  numberToStr,
  maxLength,
  requiredStrWithName,
  requiredNumberWithName
} from './form-controls/utils';

// validation

const greaterThanFieldOne = (value, values) => (
  values && value > values.fieldOne? undefined: 'Field two must be greated that field one'
)

const checkboxChecked = value => !!value;

const definedFieldsForDataHandler = [
  {
    name: 'fieldOne',
    validate: [requiredStrWithName('field one'), maxLength(5)]
  },
  {
    name: 'fieldTwo',
    validate: greaterThanFieldOne
  },
  {
    name: 'fieldThree'
  },
  {
    name: 'isAgreed',
    formatToStore: checkboxChecked
  },
  {
    name: 'theNumber',
    formatToStore: strToNumber,
    formatFromStore: numberToStr,
    validate: requiredNumberWithName('the number')
  },
  {
    name: 'capitals',
    formatToStore: upper,
    formatFromStore: lower,
    validate: requiredStrWithName('capitals')
  },
  {
    name: 'rb2',
    validate: value => (value === 'R' || value ==='G' || value === 'B') ? undefined : 'RGB only'
  },
  {
    name: 'hobbies',
    fieldArray: [
      {
        name: 'name',
        validate: requiredStrWithName('name')
      },
      {
        name: 'description'
      }
    ]
  }
];

const formValidation = values => (!values.isAgreed && values.theNumber > 42) ?  
{theNumber: 'You didn`t agree to numbers > 42'} : {};


export const formDataHandler = createFormDataHandler(definedFieldsForDataHandler, formValidation);
const fieldDefinitions = getFieldDefinitionsByName(definedFieldsForDataHandler); 

// end of validation


const FieldThree = (props) => {
  const f2 = useField('fieldTwo').value;
  if (f2) {
    return <TextInput name="fieldThree" {...props}/>
  }
  return null;
}

const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

const clearValues = (form) => {
  form.updateFields({});
};

const ErrorMessage = ({name}) => {
  const { error } = useField(name);
  return error ? <p>{error}</p>: null;
};

const SubmitButton = (props) => {
  const [state] = useFormReducer(useForm().name);
  return (
    <button {...props} style={{backgroundColor: state.formStatus.isValid? 'green': 'cyan'}} >Submit</button>
  );
};

const MyForm = () => {
  return (
    <Form
      name="myForm"
      onSubmit={submitValues}
      onSubmitSuccess={clearValues}
      className= "my-form"
      method="POST" 
      action="/myForm"
    >
      <ErrorMessage name="myFormSubmitErrorMessage"/>
      <div>
        <TextInput {...fieldDefinitions.fieldOne} afterUpdate={revalidateFieldTwo}/>
        <TextInput {...fieldDefinitions.fieldTwo}/>
        <FieldThree
          label="Name:"
          required 
          placeholder="Dynamic - on fieldTwo"
        />
        <Checkbox
          {...fieldDefinitions.isAgreed}
          label="Can the server have a number bigger than 42?"
          afterUpdate={revalidateTheNumber}
        />
        <NumberInput {...fieldDefinitions.theNumber}/>
        <TextInput
          {...fieldDefinitions.capitals}
          label="Lowercase text saved as uppercase"       
        />
        <div>
          <fieldset>
            <legend>Favorate color</legend>
            <div className="radioButtons">
              <RadioButton name="rb2" label="Red" value="R"/>
              <RadioButton name="rb2" label="Green" value="G"/>
              <RadioButton name="rb2" label="Blue" value="B"/>
            </div>
          </fieldset>
        </div>
      </div>
      <FieldArray
        name="hobbies"
        component={RenderHobbies}
      />
      <SubmitButton/>
      <TheFormState />
    </Form>
  );
};

const revalidateFieldTwo = ({getField, value}) => {
  getField('fieldTwo').validate();
}

const revalidateTheNumber = ({getField}) => {
  getField('theNumber').validate();
};

const RenderHobbies = ({fields}) => (
  <fieldset>
    <legend className="example-form_title">
      Hobbies
    </legend>
    {fields.map((hobby, index) => (
      <Scope key={hobby} name={hobby}>
        <TextInput
          {...fieldDefinitions.hobbies.name}
          name="name"
          label={`Name #${index + 1}`}
        /> 
        <TextInput
          {...fieldDefinitions.hobbies.description}
          name="description"
          label={`desc #${index + 1}`}
        />
        <button type="button" title="Remove Hobby" onClick={() => fields.remove(index)}>-</button>
      </Scope>
    ))}
    <br/><button type="button" onClick={() => fields.push()}>Add Hobby</button>
  </fieldset>
);

async function submitValues(values) {
  const response = await fetch('/myForm', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
  const result = await response.json();
  if (!result.isValid) {
    return result.errors;
  }
  window.alert(`${result.successMessage}: ${JSON.stringify(result, null, 2)}`);
  Router.push(result.nextPage);
} 

export default MyForm;
