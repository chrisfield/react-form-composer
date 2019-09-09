import React, {memo, useRef, useEffect}  from 'react';
import {
  updateField as updateFieldAction,
  setFieldTouched as setFieldTouchedAction,
  setFieldError as setFieldErrorAction
} from './actions';
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

function Field({
  afterUpdate,
  beforeUpdate,
  component,
  formatFromStore,
  formatToStore,
  getTargetValue,
  ignoreTargetValueUnless,
  name,
  spy,
  ...rest
}) {

  const {value, spyValue, dispatch, error, touched, customProps, formApi} = useField(name, spy);

  const {state: _state, ...formApiWithoutState} = formApi;

  const formApiWithoutStateRef = useRef(formApiWithoutState);

  return <FieldMemo
    {...{
      afterUpdate,
      beforeUpdate,
      formatFromStore,
      formatToStore,
      ignoreTargetValueUnless,
      getTargetValue,
      component
    }}
    name={name}
    value={value}
    error={error}
    touched={touched}
    dispatch={dispatch}
    customProps={customProps}
    spyValue={spyValue}
    formApiWithoutState={formApiWithoutStateRef.current}
    {...rest}
  />
}

function noop(){};

Field.defaultProps = {
  afterUpdate: noop,
  beforeUpdate: noop,
  component: 'input',
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

const FieldComponent = ({render, children, component: Component, ...props}) => {
  if (render) {
    return render(props);
  }
  if (typeof children === 'function') {
    return children(props);
  }
  if (typeof Component === "object") {
    return <Component {...props}/>;
  }
  const {
    handleBlur,
    handleChange,
    touched,
    error,
    elementRef,
    ...givenProps} = props;
  return React.createElement(
    Component,
    {onBlur: handleBlur, onChange: handleChange, ref: elementRef, children, ...givenProps}
  );
}

const FieldMemo = memo(({
  name,
  defaultValue,
  value = defaultValue,
  error,
  touched,
  dispatch,
  customProps,
  optimizedProps,
  validate,
  spyValue,
  formatToStore,
  formatFromStore,
  getTargetValue,
  ignoreTargetValueUnless,
  beforeUpdate,
  afterUpdate,
  component,
  formApiWithoutState,
  ...rest
}) => {
  const {registerField, deregisterField, ...formApi} = formApiWithoutState;
  const elementRef = useRef();
  const isMountedRef = useRef(false);
  const previous = usePrevious({value, customProps});

  const fieldInterfaceRef = useRef({
    name,
    getField: formApi.getField,
    setTouched: touched => dispatch(setFieldTouchedAction(touched)),
    setValue: value => dispatch(updateFieldAction(value)),
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
    const fieldInterface = fieldInterfaceRef.current;
    registerField(fieldInterface);
    return () => {
      deregisterField(fieldInterface);
    }
  }, []);

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
      afterUpdate(fieldInterfaceRef.current, spyValue, customProps);
    }
  });
  
  const handleChange = (event) => {
    const nextValueToStore = formatToStore(getTargetValue(event.target, event));
    const nextCustomProps = beforeUpdate(
      fieldInterfaceRef.current,
      formatFromStore(value),
      formatFromStore(nextValueToStore)
    );
    dispatch(updateFieldAction(nextValueToStore, nextCustomProps));
  };

  const validateValue = val => {
    const valueToValidate = (val === undefined) ? defaultValue: val;
    if (!ignoreTargetValueUnless || ignoreTargetValueUnless(elementRef.current)) {
      let validateError;
      if (validate) {
        if (Array.isArray(validate)) {
          for (let i = 0; i < validate.length && !validateError; i++) {
            validateError = validate[i](valueToValidate, spyValue, fieldInterfaceRef.current);
          }
        } else {
          validateError = validate(valueToValidate, spyValue, fieldInterfaceRef.current);
        }
      }
      dispatch(setFieldErrorAction(validateError, valueToValidate));
    }
  };

  const showAnyErrors = (event) => {
    if (!touched) {
      if (error) {
        event.preventDefault();
      }
      dispatch(setFieldTouchedAction(true));
    }
  };
  return (
    <div>
      <FieldComponent
        elementRef={elementRef}
        handleChange={handleChange}
        handleBlur={showAnyErrors}
        name={name}
        value={formatFromStore(value)}
        touched={touched}
        error={error}
        component={component}
        {...rest}
      />
    </div>
  );
});

export default Field;
