import { CIRCLE_FETCH_REQUEST, CIRCLE_FETCH_RESPONSE, CIRCLE_POST_REQUEST, CIRCLE_POST_RESPONSE } from './actions';

const initialStateGet = {
  loading: false,
  teamsData: null,
  error: null,
};

const initialStatePost = {
  loading: false,
  error: null,
};



export const circleFetch = (state = initialStateGet, action: any) => {
  switch (action.type) {
    case CIRCLE_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CIRCLE_FETCH_RESPONSE:
      return {
        ...state,
        loading: false,
        teamsData: action.teamsData,
        error: action.error,
      };
    default:
      return state;
  }
};

export const circlePost = (state = initialStatePost, action: any) => {
  switch (action.type) {
    case CIRCLE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CIRCLE_POST_RESPONSE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};