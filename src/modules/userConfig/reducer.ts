import { CONFIG_REQUEST, CONFIG_RESPONSE } from './actions';

const initialState = {
  loading: false,
  editInfo: null,
  error: null,
};

const editConf = (state = initialState, action: any) => {
  switch (action.type) {
    case CONFIG_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CONFIG_RESPONSE:
      return {
        ...state,
        loading: false,
        editInfo: action.editInfo,
        error: action.error,
      };
    default:
      return state;
  }
};

export default editConf;
