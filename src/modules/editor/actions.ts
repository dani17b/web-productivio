import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';
import { requestType, responseType } from 'src/utils/ReduxUtils';

export const GET_PROJECT_FILES = 'GET_PROJECT_FILES';

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
