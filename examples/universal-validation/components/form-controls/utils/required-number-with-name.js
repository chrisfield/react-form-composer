const requiredNumWithName = name => (
  (value) => {
    if (value === null || isNaN(value)) {
      return `Please enter a value for ${name.toLowerCase()}`;
    }
      return undefined;
  }
);

export default requiredNumWithName;
