import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';
import { requestType, responseType } from 'src/utils/ReduxUtils';

export const GET_PROJECT_FILES = 'GET_PROJECT_FILES';
export const GET_FILE_CODE = 'GET_FILE_CODE';

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
        console.log('code response', response.data);
        dispatch({
          type: responseType(GET_FILE_CODE),
          code: response.data,
        });
      });
  };
};
