import {
  FORM_REQUEST,
  FORM_RESPONSE,
  TEAM_GETDATA,
  TEAM_RESPONSE,
} from './actions';

const initialState = {
  loading: false,
  teamsInfo: [],
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
    case TEAM_GETDATA:
      return {
        ...state,
        error: null,
      };
    case TEAM_RESPONSE:
      return {
        ...state,
        teamsInfo: action.teamsInfo,
        error: action.error,
      };
  }
};
export default form;
