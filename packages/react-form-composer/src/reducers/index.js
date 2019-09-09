import {actionTypes} from "../actions";
import fieldValues from "./field-values";
import formErrors from "./form-errors";
import formStatusAndFieldStatus from "./form-status-and-field-status";

export const initialState = {};

const reducer = (state = initialState, action) => {
  if (action && actionTypes[action.type]) {
    const {formStatus, fieldStatus} = formStatusAndFieldStatus(state.formStatus, state.fieldStatus, action);
    formStatus.isValid = formStatus.errorCount === 0;
    return {
      fieldStatus,
      fieldValues: fieldValues(state.fieldValues, action),
      formErrors: formErrors(state.formErrors, action),
      formStatus
    };
  }
  return state;
};

export default reducer;
