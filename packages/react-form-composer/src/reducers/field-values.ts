import {actionTypes, Action} from "../actions.ts";
import getField from "../state-utils/get-field.ts";
import setField from "../state-utils/set-field.ts";

export const initialState = {};

const valuesReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.INIT_FORM_STATE:
      return action.fieldValues;
    case actionTypes.UPDATE_FIELDS:
      return action.fieldValues;
    case actionTypes.UPDATE_FIELD:
      return setField(state, action.field, action.value);
    case actionTypes.PUSH_TO_FIELD_ARRAY: {
      const originalArray = getField(state, action.fieldArray) || [];
      const nextArray = originalArray.slice();
      nextArray.push(action.payload);
      return setField(state, action.fieldArray, nextArray);
    }
    case actionTypes.REMOVE_FROM_FIELD_ARRAY: {
      const originalArray = getField(state, action.fieldArray) || [];
      const nextArray = originalArray.filter((_item: any, index: number) => (index !== action.index));
      return setField(state, action.fieldArray, nextArray);
    }
    case actionTypes.SET_FIELD_ERROR: {
      return setField(state, action.field, action.value);
    }
    default:
      return state;
  }
};

export default valuesReducer;
