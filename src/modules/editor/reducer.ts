import { responseType } from 'src/utils/ReduxUtils';
import {
  GET_PROJECT_FILES,
  GET_FILE_CODE,
  POST_FILE,
  UPDATE_FILE,
} from './actions';

const initialState = {
  loading: false,
  files: [],
  code: [],
  file: [],
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

export const postFile = (state = initialState, action: any) => {
  switch (action.type) {
    case responseType(POST_FILE):
      return {
        ...state,
        loading: false,
        file: action.file,
      };
    default:
      return state;
  }
};

export const updateFile = (state = initialState, action: any) => {
  switch (action.type) {
    case responseType(UPDATE_FILE):
      return {
        ...state,
        loading: false,
        file: action.updatedFile,
      };
    default:
      return state;
  }
};
