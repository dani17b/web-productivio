import { responseType } from 'src/utils/ReduxUtils';
import { GET_PROJECT_FILES } from './actions';

const initialState = {
  loading: false,
  files: [],
};

const editor = (state = initialState, action: any) => {
  switch (action.type) {
    case responseType(GET_PROJECT_FILES):
      return {
        ...state,
        loading: false,
        files: action.files,
      };
    default:
      return state;
  }
};
export default editor;
