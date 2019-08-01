import React, { useEffect, useRef, memo } from 'react';
import {deregisterField, updateField, setFieldError, setFieldTouched } from './actions';
import { useForm } from './form';
import useField from './use-field';

function usePrevious(value) {
  const ref = useRef({});
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function twoInvalidNumbers(x, y) {
  return typeof x === "number" && isNaN(x) && isNaN(y);
}

const FieldComponent = ({render, children, component, ...props}) => {
  if (render) {
    return render(props);
  }
  if (typeof children === 'function') {
    return children(props);
  }
  if (typeof component === "string") {
    const {
      handleBlur,
      handleChange,
      touched,
      error,
      elementRef,
      ...givenProps} = props;
    return React.createElement(
      component,
      {onBlur: handleBlur, onChange: handleChange, ref: elementRef, children, ...givenProps}
    );
  }
  const Component = component;
  return <Component {...props}/>;
}

const Field = ({name, ...props}) => {
  const connectionProps = useField(name);
  return (
    <FieldBase
      name={name}
      {...props}
      {...connectionProps}
    />
  );
};

const getBestValue = (value, defaultValue, formatFromStore, formatToStore) => {
  if (value !== undefined) {
    return value;
  }
  if (defaultValue !== defaultValue) {
    return defaultValue;
  }
  return formatToStore(formatFromStore(undefined));
}

const FieldBase = memo(({
  name,
  afterUpdate,
  beforeUpdate,
  formatFromStore,
  formatToStore,
  getTargetValue,
  ignoreTargetValueUnless,
  validate,
  dispatch,
  defaultValue,
  value = value === undefined? defaultValue : value,
  error,
  touched,
  customProps,
  ...props
}) => {
  const formApi = useForm();
  const elementRef = useRef();
  const fieldInterfaceRef = useRef({
    name,
    getForm: formApi.getPublicFormApi,
    getField: formApi.getField,
    setTouched: touched => dispatch(setFieldTouched(touched)),
    setValue: value => dispatch(updateField(value)),
  });
  Object.assign(fieldInterfaceRef.current, {
    validate: () => {validateValue(value)},
    value,
    error,
    touched,
    customProps
  }); 
  useEffect(() => {
    fieldInterfaceRef.current.element = elementRef.current;
  });

  useEffect(() => {
    formApi.registerField(fieldInterfaceRef.current);
    return () => {
      dispatch(deregisterField());
      formApi.deregisterField(fieldInterfaceRef.current);
    }
  }, []);


  const isMountedRef = useRef(false);
  const previous = usePrevious({value, customProps});
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      if (elementRef.current) {
        if (!ignoreTargetValueUnless || ignoreTargetValueUnless(elementRef.current)) {
          const inputValue = formatToStore(getTargetValue(elementRef.current));
          validateValue(inputValue);
        }
      } else {
        validateValue(value);
      }
      return;
    }

    if (value !== previous.value && !twoInvalidNumbers(value, previous.value)) {
      validateValue(value);
    }

    if ((value !== previous.value && !twoInvalidNumbers(value, previous.value))
      || customProps !== previous.customProps) {
      afterUpdate(fieldInterfaceRef.current, customProps);
    }
  });
  
  const handleChange = (event) => {
    const nextValueToStore = formatToStore(getTargetValue(event.target, event));
    const nextCustomProps = beforeUpdate(
      fieldInterfaceRef.current,
      formatFromStore(value),
      formatFromStore(nextValueToStore)
    );
    dispatch(updateField(nextValueToStore, nextCustomProps));
  };

  const validateValue = (valueToValidate = getBestValue(valueToValidate, defaultValue, formatFromStore, formatToStore)) => {
    if (!ignoreTargetValueUnless || ignoreTargetValueUnless(elementRef.current)) {
      let validateError;
      if (validate) {
        const fieldValues = formApi.getState().fieldValues;
        if (Array.isArray(validate)) {
          for (let i = 0; i < validate.length && !validateError; i++) {
            validateError = validate[i](valueToValidate, fieldValues, {...fieldInterfaceRef.current, ...props});
          }
        } else {
          validateError = validate(valueToValidate, fieldValues, {...fieldInterfaceRef.current, ...props});
        }
      }
      dispatch(setFieldError(validateError, valueToValidate));
    }
  };

  const showAnyErrors = (event) => {
    if (!touched) {
      if (error) {
        event.preventDefault();
      }
      dispatch(setFieldTouched(true));
    }
  };

  return (
    <FieldComponent
      elementRef={elementRef}
      handleChange={handleChange}
      handleBlur={showAnyErrors}
      name={name}
      value={formatFromStore(value)}
      touched={touched}
      error={error}
      {...props}
    />
  );
});

const noop = () => (undefined);
Field.defaultProps = {
  afterUpdate: noop,
  beforeUpdate: noop,
  formatFromStore: (value = "") => value,
  formatToStore: (value) => value,
  getTargetValue: (target, value) => {
    if (target) {
      return target.value;
    } else {
      return value;
    }
  }
};

export default Field;