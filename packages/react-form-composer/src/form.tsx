import React, { createContext, useContext, useRef, useEffect, useState, ReactNode } from 'react';
import isPromise from "is-promise";
import SubmissionError from "./submission-error.ts";
import { startSubmit, stopSubmit, updateFields, resetFieldsIsDone } from './actions.ts';
import useFormReducer from './use-form-reducer.ts';

export const Context = createContext({});

export const Provider = ({ children, ...props }: any) => {
  return (
    <Context.Provider value={props}>
      {children}
    </Context.Provider>
  );
};

export const Consumer = Context.Consumer;

export const useForm = () => {
  const { formApi }: any = useContext(Context);
  return formApi;
};

const noop = () => (undefined);


const FormReducerRef = ({formReducerRef}: any) => {
  const formReducer = useFormReducer(useForm().name);
  formReducerRef.current = formReducer;
  return null;
};

export type FormProps = {
  name: string,
  initialValues?: object,
  onSubmit?: Function,
  onSubmitSuccess?: Function,
  children: ReactNode | ((api: renderFunctionApi) => ReactNode),
  render? : (api: renderFunctionApi) => ReactNode
  component: string | ReactNode
};

type renderFunctionApi = {
  handleSubmit: Function,
  elementRef: any
}

export const Form = ({
  name,
  initialValues,
  onSubmit=noop,
  onSubmitSuccess=noop,
  children,
  render,
  component = 'form',
  ...props
}: FormProps) => {

  const initFields: any = [];
  const fieldsRef = useRef(initFields);
  const initFieldArrays: any = [];
  const fieldArraysRef = useRef(initFieldArrays);
  const formReducerRef = useRef([]);
  const formRef = useRef();
  const [initialized, setInitialized] = useState(!initialValues);

  useEffect(() => {
    const [state, dispatch]: any = formReducerRef.current;
    if (!initialized) {
      setInitialized(true);
      dispatch(updateFields(initialValues));
    } else if (state.formStatus.isResetFieldsDue) {
      dispatch(resetFieldsIsDone());
    }
  });

  const formApiRef = useRef({
    deregisterField: (field: any) => {
      const index = fieldsRef.current.indexOf(field);
      if (index > -1) {
        fieldsRef.current.splice(index, 1);
      }
    },
    deregisterFieldArray: (fieldArray: any) => {
      const index = fieldArraysRef.current.indexOf(fieldArray);
      if (index > -1) {
        fieldArraysRef.current.splice(index, 1);
      }
    },
    name,
    registerField: (field: any) => {
      fieldsRef.current.push(field);
    },
    registerFieldArray: (fieldArray: any) => {
      fieldArraysRef.current.push(fieldArray);
    },
    updateFields: (fieldValues: any) => {
      const dispatch: Function = formReducerRef.current[1];
      dispatch(updateFields(fieldValues))
    },
    getField: (fieldName: string) => {
      for (const field of fieldsRef.current) {
        if (field.name === fieldName) {
          return field.getInterface();
        }
      }
    },
    formReducerRef
  });

  const markAllFieldsAsTouched = (touched = true) => {
    fieldsRef.current.forEach((field: any) => {
      field.setTouched(touched);
    });
  };

  const focusOnFieldWithError = () => {
    for (const field of fieldsRef.current) {
      const fieldApi = field.getInterface();
      if (fieldApi.error && fieldApi.element) {
        const element = fieldApi.element;
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

  const handleSubmit = (event: any) => {
    markAllFieldsAsTouched();
    const [formState, dispatch]: any = formReducerRef.current;
    if (!formState.formStatus.isValid) {
      event.preventDefault();
      focusOnFieldWithError();
      return;
    }
    if (onSubmit === noop && formRef.current) {
      const theForm: any = formRef.current;
      theForm.submit();
      return;
    }
    event.preventDefault();
    let submitResult;
    dispatch(startSubmit());
    try {
      submitResult = onSubmit(formState.fieldValues);
    } catch (submitError) {
      dispatch(stopSubmit(submitError.errors));
      if (submitError instanceof SubmissionError) {
        focusOnFieldWithError();
        return;
      }
      throw submitError;
    }

    if (!isPromise(submitResult)) {
      dispatch(stopSubmit());
      onSubmitSuccess(formApiRef.current);
      return;
    }
    return submitResult.then(
      () => {
        dispatch(stopSubmit());
        onSubmitSuccess(formApiRef.current);
        return;
      },
      (asyncError) => {
        dispatch(stopSubmit(asyncError.errors));
        if (asyncError instanceof SubmissionError) {
          focusOnFieldWithError();
          return;
        }
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
    const Component: any = component;
    return <Component {...props} children={children} onSubmit={handleSubmit} elementRef={formRef}/>;
  }

  return (
    <Provider 
      formApi={formApiRef.current}
    >
      <FormReducerRef formReducerRef={formReducerRef}/>
      {initialized && getContent()}
    </Provider>
  );
};