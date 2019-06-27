import React, { createContext, useContext, useRef, useEffect, useState} from 'react';
import isPromise from "./is-promise";
import { startSubmit, stopSubmit, updateFields, resetFieldsIsDone } from './actions';
import useFormReducer from './use-form-reducer';

export const Context = createContext({});

export const Provider = ({ children, ...props }) => {
  return (
    <Context.Provider value={props}>
      {children}
    </Context.Provider>
  );
};

export const Consumer = Context.Consumer;

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
      console.log('reset');
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
    const dispatch = formReducerRef.current[1];
    if (!initialized) {
      setInitialized(true);
      dispatch(updateFields(initialValues));
    }
  });

  const getPublicFormApi = () => {
    const { name, getField, updateFields, dispatch, getState} = formApiRef.current;
    return {
      name,
      getField,
      updateFields,
      dispatch,
      state: getState()
    }
  };

  const formApiRef = useRef({
    deregisterField: (field) => {
      const index = fieldsRef.current.indexOf(field);
      if (index > -1) {
        fieldsRef.current.splice(index, 1);
      }
    },
    name,
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
    getState: () => (formReducerRef.current[0]),
    dispatch: (action) => {formReducerRef.current[1](action)}
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

  const focusOnFieldWithError = () => {
    for (const field of fieldsRef.current) {
      if (field.error && field.element) {
        const element = field.element;
        if (element.focus) {
          element.focus();
        }
        if (element.scrollIntoView) {
          element.scrollIntoView();
        }
        break;
      }
    }
  };

  const handleSubmit = (event) => {
    markAllFieldsAsTouched();
    const [formState, dispatch] = formReducerRef.current;
    if (!formState.formStatus.isValid) {
      event.preventDefault();
      focusOnFieldWithError();
      return;
    }
    if (onSubmit === noop && formRef.current) {
      formRef.current.submit();
      return;
    }
    event.preventDefault();
    let submitResult;
    dispatch(startSubmit());
    submitResult = onSubmit(formState.fieldValues);

    if (!isPromise(submitResult)) {
      dispatch(stopSubmit(submitResult));
      if (submitResult) { // must have returned a form error
        focusOnFieldWithError();
        return;
      }
      onSubmitSuccess(getPublicFormApi());
      return;
    }
    return submitResult.then(
      (submitError) => {
        dispatch(stopSubmit(submitError));
        if (submitError) {
          focusOnFieldWithError();
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

  return (
    <Provider 
      formApi={formApiRef.current}
    >
      <FormReducerRef formReducerRef={formReducerRef} reset={validateAllFields}/>
      {initialized && getContent()}
    </Provider>
  );
};