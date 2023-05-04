
import { requestType, responseType } from 'src/utils/ReduxUtils';
import { TsxObj } from 'src/utils/parser/TsxToJson';
import {
  GET_PROJECT_FILES, 
  SET_JSON_ARRAY_REQUEST,
  GET_PROJECT_FILES,
  GET_FILE_CODE,
  POST_FILE,
  UPDATE_FILE,
} from './actions';


export interface initialStateType {
  files: any[];
  modules: TsxObj[];
  code: any[],
  file: any[],
}

const initialState: initialStateType = {
  files: [],
  modules: [],
 code: [],
  file: [],
};

export const editor = (state = initialState, action: any) => {
  switch (action.type) {
    case responseType(GET_PROJECT_FILES):
      return {
        ...state,

        files: action.files,
      };
    case SET_JSON_ARRAY_REQUEST:
      debugger;
      console.log('reducer holis :)');
      return {
        ...state,
        modules: action.modules,
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
