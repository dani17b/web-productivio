import { FORM_REQUEST, FORM_RESPONSE } from './actions';

const initialState = {
  loading: false,
  formInfo: null,
  error: null,
};

const form = (state = initialState, action: any) => {
  switch (action.type) {
    case FORM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORM_RESPONSE:
      return {
        ...state,
        loading: false,
        formInfo: action.formInfo,
        error: action.error,
      };
    default:
      return state;
  }
};
export default form;
