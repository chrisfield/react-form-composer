import React, { createContext, useContext, useRef, useEffect, useState} from 'react';
import isPromise from "./is-promise";
import { startSubmit, stopSubmit, updateFields, resetFieldsIsDone } from './actions';
import useFormReducer from './use-form-reducer';
import FormContextProvider from './form-context-provider';
import focusOnFirstFieldWithError from './focus-on-first-field-with-error';

export const Context = createContext({});

export const Provider = ({ children, ...props }) => {
  return (
    <Context.Provider value={props}>
      {children}
    </Context.Provider>
  );
};

export const useForm = () => {
  const { formApi } = useContext(Context);
  return formApi;
};

const noop = () => (undefined);

const FormReducerRef = ({formReducerRef, reset}) => {
  const formReducer = useFormReducer(useForm().name);
  useEffect(() => {
    if (formReducer[0].formStatus.isResetFieldsDue) {
      formReducer[1](resetFieldsIsDone());
      reset();
    }
  });
  formReducerRef.current = formReducer;
  return null;
};

export const Form = ({
  name,
  initialValues,
  onSubmit=noop,
  onSubmitSuccess=noop,
  onSubmitError=focusOnFirstFieldWithError,
  onMount=noop,
  onUnmount=noop,
  children,
  render,
  component = 'form',
  ...props
}) => {

  const initFields = [];
  const fieldsRef = useRef(initFields);
  const formReducerRef = useRef([]);
  const [initialized, setInitialized] = useState(!initialValues);
  const formRef = useRef();

  useEffect(() => {
    onMount(getPublicFormApi());
    return () => {onUnmount(getPublicFormApi())};
  }, []);

  useEffect(() => {
    const dispatch = formReducerRef.current[1];
    if (!initialized) {
      setInitialized(true);
      dispatch(updateFields(initialValues));
    }
  });

  const getPublicFormApi = () => {
    const { name, getField, updateFields, dispatch} = formApiRef.current;
    return {
      name,
      getField,
      getFields: () => fieldsRef.current,
      updateFields,
      dispatch,
      state: formReducerRef.current[0]
    }
  };

  const formApiRef = useRef({
    deregisterField: (field) => {
      const index = fieldsRef.current.indexOf(field);
      if (index > -1) {
        fieldsRef.current.splice(index, 1);
      }
    },
    registerField: (field) => {
      fieldsRef.current.push(field);
    },
    updateFields: fieldValues => {formReducerRef.current[1](updateFields(fieldValues))},
    getField: fieldName => {
      for (const field of fieldsRef.current) {
        if (field.name === fieldName) {
          return field;
        }
      }
    },
    getPublicFormApi,
  });

  const markAllFieldsAsTouched = (touched= true) => {
    fieldsRef.current.forEach((field) => {
      field.setTouched(touched);
    });
  };

  const validateAllFields = () => {
    fieldsRef.current.forEach((field) => {
      field.validate();
    });
  };

  const handleSubmit = (event) => {
    markAllFieldsAsTouched();
    const [formState, dispatch] = formReducerRef.current;
    if (!formState.formStatus.isValid) {
      event.preventDefault();
      onSubmitError(getPublicFormApi());
      return;
    }
    if (onSubmit === noop && formRef.current) {
      formRef.current.submit();
      return;
    }
    event.preventDefault();
    event.stopPropagation()
    let submitResult;
    dispatch(startSubmit());
    submitResult = onSubmit(formState.fieldValues);

    if (!isPromise(submitResult)) {
      dispatch(stopSubmit(submitResult));
      if (submitResult) { // must have returned a form error
        onSubmitError(getPublicFormApi());
        return;
      }
      onSubmitSuccess(getPublicFormApi());
      return;
    }
    return submitResult.then(
      (submitError) => {
        dispatch(stopSubmit(submitError));
        if (submitError) {
          onSubmitError(getPublicFormApi());
          return;  
        }
        onSubmitSuccess(getPublicFormApi());
        return;
      },
      (asyncError) => {
        dispatch(stopSubmit());
        throw asyncError;
      }
    );
  };

  const getContent = () => {
    if (render) {
      return render({handleSubmit,  elementRef:formRef, ...props});
    }
    if (typeof children === 'function') {
      return children({handleSubmit, elementRef: formRef, ...props});
    }
    if (typeof component === "string") {
      return React.createElement(
        component,
        {children, onSubmit: handleSubmit, ref: formRef, ...props}
      );
    }
    const Component = component;
    return <Component {...props} children={children} onSubmit={handleSubmit} elementRef={formRef}/>;
  }

  const formApi = formApiRef.current;
  return (
    <FormContextProvider
      name={name}
      formApi={formApi}
    >
      <FormReducerRef formReducerRef={formReducerRef} reset={validateAllFields}/>
      {initialized && getContent()}
    </FormContextProvider>
  );
};