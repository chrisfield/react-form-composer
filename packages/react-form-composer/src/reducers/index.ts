import {actionTypes, Action} from "../actions.ts";
import fieldValues from "./field-values.ts";
import formErrors from "./form-errors.ts";
import formStatusAndFieldStatus from "./form-status-and-field-status.ts";

export const initialState: any = {};

const reducer = (state = initialState, action: Action) => {
  if (action && actionTypes[action.type] && action.form) {
    const formState = state[action.form] || {};
    const {formStatus, fieldStatus} = formStatusAndFieldStatus(formState.formStatus, formState.fieldStatus, action);
    formStatus.isValid = formStatus.errorCount === 0;
    return {
      ...state,
      [action.form]: {
        fieldStatus,
        fieldValues: fieldValues(formState.fieldValues, action),
        formErrors: formErrors(formState.formErrors, action),
        formStatus,
      },
    };
  }
  return state;
};

export default reducer;
