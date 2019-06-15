import { formReducer } from 'react-form-composer';

export const initialState = {};

const rootReducer = (state = initialState, action) => (
  {
    form: formReducer(state.form, action)
  }
);

export default rootReducer;