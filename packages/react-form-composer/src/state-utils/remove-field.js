import toPath from "./to-path";

const removeFieldWithPath = (state, path, pathIndex) => {
  if (pathIndex >= path.length) {
    return value;
  }

  const first = path[pathIndex];
  const firstState = state && (Array.isArray(state) ? state[Number(first)] : state[first]);

  let next;
  if (pathIndex >= path.length - 2) {
    if (Array.isArray(firstState)) {
      next = firstState.filter((_item, index) => (index !== parseInt(path[path.length -1], 10)));
    } else {
      const {[path[path.length -1]]: _deletedKey, ...otherValues} = firstState;
      next = otherValues;
    }
  } else {
    next = removeFieldWithPath(firstState, path, pathIndex + 1);
  }

  if (!state) {
    if (isNaN(first)) {
      return { [first]: next };
    }
    const initialized = [];
    initialized[parseInt(first, 10)] = next;
    return initialized;
  }

  if (Array.isArray(state)) {
    const copy = state.slice();
    copy[parseInt(first, 10)] = next;
    return copy;
  }

  return {
    ...state,
    [first]: next,
  };
};

const removeField = (state, field) =>
  removeFieldWithPath(state, toPath(field), 0);

export default removeField;
