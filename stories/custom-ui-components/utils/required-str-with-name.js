const requiredStrWithName = name => (
  (value) => (
    value && value.trim && value.trim().length > 0 ? undefined: `Please enter a value for ${name.toLowerCase()}`
  )
);

export default requiredStrWithName;
