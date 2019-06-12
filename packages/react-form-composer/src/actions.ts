export enum actionTypes {
  DEREGISTER_FIELD = "DEREGISTER_FIELD",
  INIT_FORM_STATE = "INIT_FORM_STATE",
  PUSH_TO_FIELD_ARRAY = "PUSH_TO_FIELD_ARRAY",
  REMOVE_FROM_FIELD_ARRAY = "REMOVE_FROM_FIELD_ARRAY",
  SET_FIELD_ERROR = "SET_FIELD_ERROR",
  SET_FIELD_TOUCHED = "SET_FIELD_TOUCHED",
  START_SUBMIT = "START_SUBMIT",
  STOP_SUBMIT = "STOP_SUBMIT",
  UPDATE_FIELD = "UPDATE_FIELD",
  UPDATE_FIELDS = "UPDATE_FIELDS",
  RESET_FIELDS_IS_DONE = "RESET_FIELDS_IS_DONE"
};


export const initFormState = (
  form: string,
  {formStatus= {}, fieldStatus= {}, fieldValues= {}, formErrors= {}}= {},
) => ({
  type: actionTypes.INIT_FORM_STATE as typeof actionTypes.INIT_FORM_STATE,
  form, formStatus, fieldStatus, fieldValues, formErrors
});

export const resetFieldsIsDone = () => ({
  type: actionTypes.RESET_FIELDS_IS_DONE as typeof actionTypes.RESET_FIELDS_IS_DONE
});

// field
export const updateField = (value: any, customProps?: any) => ({
  type: actionTypes.UPDATE_FIELD as typeof actionTypes.UPDATE_FIELD, value, customProps
});

export const updateFields = (fieldValues: object) => ({
  type: actionTypes.UPDATE_FIELDS as typeof actionTypes.UPDATE_FIELDS,
  fieldValues
});

//field
export const setFieldError = (error: any, value: any) => ({
  type: actionTypes.SET_FIELD_ERROR as typeof actionTypes.SET_FIELD_ERROR,
  error, value
});

//field
export const setFieldTouched = (touched: boolean) => ({
  type: actionTypes.SET_FIELD_TOUCHED as typeof actionTypes.SET_FIELD_TOUCHED,
  touched
});

//fieldArray
export const pushToFieldArray = (payload: object) => ({
  type: actionTypes.PUSH_TO_FIELD_ARRAY as typeof actionTypes.PUSH_TO_FIELD_ARRAY,
  payload
});

//fieldArray
export const removeFromFieldArray = (index: number) => ({
  type: actionTypes.REMOVE_FROM_FIELD_ARRAY as typeof actionTypes.REMOVE_FROM_FIELD_ARRAY,
  index
});

//field
export const deregisterField = () => ({
  type: actionTypes.DEREGISTER_FIELD as typeof actionTypes.DEREGISTER_FIELD
});

//form
export const startSubmit = () => ({
  type: actionTypes.START_SUBMIT as typeof actionTypes.START_SUBMIT
});

export const stopSubmit = (formErrors?: object) => ({
  type: actionTypes.STOP_SUBMIT as typeof actionTypes.STOP_SUBMIT,
  formErrors
});


type InitFormStateAction = ReturnType <typeof initFormState>;

interface ResetFieldsIsDoneAction 
extends ReturnType <typeof resetFieldsIsDone> {
  form: string;
}

interface UpdateFieldAction
extends ReturnType <typeof updateField> {
  field: string,
  form: string;
}

interface UpdateFieldsAction
extends ReturnType <typeof updateFields> {
  form: string;
}

interface SetFieldErrorAction
extends ReturnType <typeof setFieldError> {
  field: string,
  form: string;
}

interface SetFieldTouchedAction
extends ReturnType <typeof setFieldTouched> {
  field: string,
  form: string;
}

interface PushToFieldArrayAction
extends ReturnType <typeof pushToFieldArray> {
  fieldArray: string,
  form: string;
}

interface RemoveFromFieldArrayAction
extends ReturnType <typeof removeFromFieldArray> {
  fieldArray: string,
  form: string;
}

interface DeregisterFieldAction
extends ReturnType <typeof deregisterField> {
  field: string,
  form: string;
}

interface StartSubmitAction
extends ReturnType <typeof startSubmit> {
  form: string;
}

interface StopSubmitAction
extends ReturnType <typeof stopSubmit> {
  form: string;
}


export type Action = 
  InitFormStateAction |
  ResetFieldsIsDoneAction |
  UpdateFieldAction |
  UpdateFieldsAction |
  SetFieldErrorAction |
  SetFieldTouchedAction |
  PushToFieldArrayAction |
  RemoveFromFieldArrayAction |
  DeregisterFieldAction |
  StartSubmitAction |
  StopSubmitAction;
