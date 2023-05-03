import { responseType } from 'src/utils/ReduxUtils';
import { GET_PROJECT_FILES, PUSH_JSON_TO_ARRAY } from './actions';

const initialState = {
  loading: false,
  files: [],
  modules: [],
};

const editor = (state = initialState, action: any) => {
  switch (action.type) {
    case responseType(GET_PROJECT_FILES):
      return {
        ...state,
        loading: false,
        files: action.files,
      };
    case responseType(PUSH_JSON_TO_ARRAY):
      return {
        ...state,
        loading: false,
        modules: action.modules,
      };
    default:
      return state;
  }
};
export default editor;
