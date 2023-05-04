import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';
import { requestType, responseType } from 'src/utils/ReduxUtils';
import { TsxObj } from 'src/utils/parser/TsxToJson';

export const GET_PROJECT_FILES = 'GET_PROJECT_FILES';
export const GET_FILE_CODE = 'GET_FILE_CODE';
export const POST_FILE = 'POST_FILE';
export const UPDATE_FILE = 'UPDATE_FILE';

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

export const getCode = (path: string, file: string): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: requestType(GET_FILE_CODE),
    });

    axios
      .request({
        url: `/file/${path}/${file}`,
        method: 'GET',
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        dispatch({
          type: responseType(GET_FILE_CODE),
          code: response.data,
        });
      });
  };
};

export const postFile = (file: any): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: POST_FILE,
    });
    axios
      .request({
        url: '/save-file',
        method: 'POST',
        data: file,
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        const file = response.data;
        dispatch({
          type: POST_FILE,
          file,
        });
      });
  };
};

export const updateFile = (file: any): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: UPDATE_FILE,
    });
    axios
      .request({
        url: '/update-file',
        method: 'POST',
        data: file,
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        const updatedFile = response.data;
        dispatch({
          type: UPDATE_FILE,
          updatedFile,
        });
      });
  };
};
