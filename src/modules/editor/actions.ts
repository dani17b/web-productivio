import axios from 'axios';
import { useSelector } from 'react-redux';
import { SERVER_BASE_URL } from 'src/config/Config';
import { requestType, responseType } from 'src/utils/ReduxUtils';
import { TsxObj } from 'src/utils/parser/TsxToJson';

export const GET_PROJECT_FILES = 'GET_PROJECT_FILES';

export const CREATE_JSON = 'CREATE_JSON';

export const SET_JSON_ARRAY_REQUEST = 'SET_JSON_ARRAY_REQUEST';

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

export const setJsonArray = (modules: TsxObj[]): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: SET_JSON_ARRAY_REQUEST,
      modules,
    });
  };
};
