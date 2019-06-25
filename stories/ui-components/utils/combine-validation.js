export default function combineValidation(validate1, validate2) {
  if (!validate1) {
    return validate2;
  }
  if (!validate2) {
    return validate1;
  }
  const v1Array = Array.isArray(validate1) ? validate1: [validate1];
  const v2Array = Array.isArray(validate2) ? validate2: [validate2];
  return v1Array.concat(v2Array);
}
