import { responseType } from 'src/utils/ReduxUtils';
import { TsxObj } from 'src/utils/parser/TsxToJson';
import {
  GET_PROJECT_FILES,
  SET_JSON_ARRAY_REQUEST,
  GET_FILE_CODE,
  POST_FILE,
  UPDATE_FILE,
  PUSH_JSON_TO_ARRAY,
  UPDATE_JSON_IN_ARRAY,
  DELETE_JSON_FROM_ARRAY,
  UPDATE_ALL_JSONS_IN_ARRAY,
} from './actions';

export interface initialStateType {
  files: any[];
  modules: TsxObj[];
  code: any[];
  file: any[];
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
      return {
        ...state,
        modules: action.modules,
      };
    case UPDATE_JSON_IN_ARRAY:
      return {
        ...state,
        modules: state.modules.map((module) =>
          module.id === action.module.id ? action.module : module
        ),
      };
    case UPDATE_ALL_JSONS_IN_ARRAY:
      return {
        ...state,
        modules: action.modules,
      };
    case PUSH_JSON_TO_ARRAY:
      return {
        ...state,
        modules: [...state.modules, action.module],
      };
    case DELETE_JSON_FROM_ARRAY:
      return {
        ...state,
        modules: state.modules.filter(
          (module) => module.id !== action.module.id
        ),
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
