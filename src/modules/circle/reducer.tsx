import { CIRCLE_FETCH_REQUEST, CIRCLE_FETCH_RESPONSE } from './actions';

const initialState = {
  loading: false,
  teamsData: null,
  error: null,
};

const circleFetch = (state = initialState, action: any) => {
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

export default circleFetch;
