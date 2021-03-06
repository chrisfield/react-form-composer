import * as actions from '../src/actions'
import { actionTypes as types } from '../src/actions'

describe('actions', () => {
  it('should create an action: initFormState', () => {
    const expectedAction = {
      type: types.INIT_FORM_STATE,
      formStatus:{},
      fieldStatus:{},
      fieldValues:{},
      formErrors:{}
    }
    const expectedAction2 = {
      type: types.INIT_FORM_STATE,
      formStatus:{},
      fieldStatus:{},
      fieldValues:{f1: 'One'},
      formErrors:{}
    }
    expect(actions.initFormState()).toEqual(expectedAction)
    expect(actions.initFormState({fieldValues: {f1: 'One'}})).toEqual(expectedAction2)
  })

  it('should create an action: updateField', () => {
    const value = 'value1'
    const expectedAction = {
      type: types.UPDATE_FIELD,
      value
    }
    expect(actions.updateField(value)).toEqual(expectedAction)
  })

  it('should create an action: updateFields', () => {
    const fieldValues = {
      field1: 'f1',
      field2: 'f2'
    }
    const expectedAction = {
      type: types.UPDATE_FIELDS,
      fieldValues
    }
    expect(actions.updateFields(fieldValues)).toEqual(expectedAction)
  })

  it('should create an action: setFieldError', () => {
    const error = 'Required field - please enter a value'
    const value = 'value1'
    const expectedAction = {
      type: types.SET_FIELD_ERROR,
      error,
      value
    }
    expect(actions.setFieldError(error, value)).toEqual(expectedAction)
  })

  it('should create an action: setFieldTouched', () => {
    const expectedActionForTrue = {
      type: types.SET_FIELD_TOUCHED,
      touched: true
    }
    const expectedActionForFalse = {
      type: types.SET_FIELD_TOUCHED,
      touched: false
    }
    expect(actions.setFieldTouched(true)).toEqual(expectedActionForTrue)
    expect(actions.setFieldTouched(false)).toEqual(expectedActionForFalse)
  })

  it('should create an action: pushToFieldArray', () => {
    const payload = {
      hobbie: 'Hiking'
    }
    const expectedAction = {
      type: types.PUSH_TO_FIELD_ARRAY,
      payload
    }
    expect(actions.pushToFieldArray(payload)).toEqual(expectedAction)
  })

  it('should create an action: removeFromFieldArray', () => {
    const index = 3
    const expectedAction = {
      type: types.REMOVE_FROM_FIELD_ARRAY,
      index
    }
    expect(actions.removeFromFieldArray(index)).toEqual(expectedAction)
  })

  it('should create an action: deregisterField', () => {
    const expectedAction = {
      type: types.DEREGISTER_FIELD,
    }
    expect(actions.deregisterField()).toEqual(expectedAction)
  })

  it('should create an action: startSubmit', () => {
    const expectedAction = {
      type: types.START_SUBMIT
    }
    expect(actions.startSubmit()).toEqual(expectedAction)
  })

  it('should create an action: stopSubmit', () => {
    const formErrors = {
      userName: 'This username is already taken'
    }
    const expectedActionWithErrors = {
      type: types.STOP_SUBMIT,
      formErrors
    }
    const expectedActionWithoutErrors = {
      type: types.STOP_SUBMIT
    }
    expect(actions.stopSubmit(formErrors)).toEqual(expectedActionWithErrors)
    expect(actions.stopSubmit()).toEqual(expectedActionWithoutErrors)
  })

})
