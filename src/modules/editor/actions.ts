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
export const PUSH_JSON_TO_ARRAY = 'PUSH_JSON_TO_ARRAY';
export const UPDATE_JSON_IN_ARRAY = 'UPDATE_JSON_IN_ARRAY';
export const DELETE_JSON_FROM_ARRAY = 'DELETE_JSON_FROM_ARRAY';

export const getFiles = (projectPath: string): any => {
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: `/project?path=${projectPath}`,
        method: 'GET',
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const setJsonArray = (modules: TsxObj[]): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: SET_JSON_ARRAY_REQUEST,
      modules,
    });
  };
};

export const updateJsonInArray = (module: TsxObj): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: UPDATE_JSON_IN_ARRAY,
      module,
    });
  };
};

export const pushJsonToArray = (module: TsxObj): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: PUSH_JSON_TO_ARRAY,
      module,
    });
  };
};

export const deleteJsonFromArray = (module: TsxObj): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: DELETE_JSON_FROM_ARRAY,
      module,
    });
  };
};

export const getComponents = (projectPath: string): any => {
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: `/components?path=${projectPath}`,
        method: 'GET',
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getPath = () => {
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: '/projectPath',
        method: 'GET',
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getCode = (path: string, file: string): any => {
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: `/file/${path}/${file}`,
        method: 'GET',
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
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
