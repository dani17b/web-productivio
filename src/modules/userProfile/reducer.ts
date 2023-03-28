import { USER_REQUEST, USER_RESPONSE } from './actions';

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const getUser = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_RESPONSE:
      return {
        ...state,
        loading: false,
        user: action.user,
        error: action.error,
      };
    default:
      return state;
  }
};
export default getUser;
