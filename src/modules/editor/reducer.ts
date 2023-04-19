import { responseType } from 'src/utils/ReduxUtils';
import { GET_PROJECT_FILES, GET_FILE_CODE } from './actions';

const initialState = {
  loading: false,
  files: [],
  code: [],
};

export const editor = (state = initialState, action: any) => {
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

export const code = (state = initialState, action: any) => {
  switch (action.type) {
    case responseType(GET_FILE_CODE):
      return {
        ...state,
        loading: false,
        code: action.code,
      };
    default:
      return state;
  }
};
