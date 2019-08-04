
const strToNumber = str => {
  const num = parseInt(str.replace(/[^\d.-]/g, ""), 10);
  if (Number.isNaN(num)) {
    return undefined;
  }
  return num;
};

export default strToNumber;
