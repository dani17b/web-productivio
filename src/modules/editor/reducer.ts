import { requestType, responseType } from 'src/utils/ReduxUtils';
import { GET_PROJECT_FILES, SET_JSON_ARRAY_REQUEST } from './actions';
import { TsxObj } from 'src/utils/parser/TsxToJson';

export interface initialStateType {
  files: any[];
  modules: TsxObj[];
}

const initialState: initialStateType = {
  files: [],
  modules: [],
};

const editor = (state = initialState, action: any) => {
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
export default editor;
