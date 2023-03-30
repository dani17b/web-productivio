import { GET_USERS_REQUEST, GET_USERS_RESPONSE } from './actions';

const initialState = {
  loading: false,
  users: [],
};

const admin = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_USERS_RESPONSE:
      return {
        ...state,
        loading: false,
        users: action.users,
      };
    default:
      return state;
  }
};
export default admin;
