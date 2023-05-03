import axios from 'axios';
import { useSelector } from 'react-redux';
import { SERVER_BASE_URL } from 'src/config/Config';
import { requestType, responseType } from 'src/utils/ReduxUtils';
import { TagObj, TsxObj } from 'src/utils/parser/TsxToJson';

export const GET_PROJECT_FILES = 'GET_PROJECT_FILES';

export const CREATE_JSON = 'CREATE_JSON';

export const PUSH_JSON_TO_ARRAY = 'PUSH_JSON_TO_ARRAY';

export const getFiles = (projectPath: string): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: requestType(GET_PROJECT_FILES),
    });

    axios
      .request({
        url: `/project?path=${projectPath}`,
        method: 'GET',
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        dispatch({
          type: responseType(GET_PROJECT_FILES),
          files: response.data,
        });
      });
  };
};

export const pushJsonArray = (tag: TagObj): any => {
  return (dispatch: (arg0: any) => void) => {
    const { modules } = useSelector((state: any) => state.editor);

    modules.push(tag);
    dispatch({
      type: requestType(PUSH_JSON_TO_ARRAY),
      modules,
    });
  };
};
