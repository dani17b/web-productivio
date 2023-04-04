import {
  TEAM_POST_REQUEST,
  TEAM_POST_RESPONSE,
  USERS_FETCH_REQUEST,
  USERS_FETCH_RESPONSE,
} from './actions';

const initialState = {
  loading: false,
  usersData: null,
  error: null,
};

export const usersFetch = (state = initialState, action: any) => {
  switch (action.type) {
    case USERS_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USERS_FETCH_RESPONSE:
      return {
        ...state,
        loading: false,
        usersData: action.usersData,
        error: action.error,
      };
    default:
      return state;
  }
};

export const teamPost = (state = initialState, action: any) => {
  switch (action.type) {
    case TEAM_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TEAM_POST_RESPONSE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default usersFetch;
