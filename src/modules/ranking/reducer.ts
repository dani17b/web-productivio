import { GET_RANKING_REQUEST, GET_RANKING_RESPONSE } from './actions';

const initialState = {
  loading: false,
  ranking: null,
};

const ranking = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_RANKING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_RANKING_RESPONSE:
      return {
        ...state,
        loading: false,
        ranking: action.ranking,
      };
    default:
      return state;
  }
};
export default ranking;
