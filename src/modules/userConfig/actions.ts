import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';

export interface EditProps {
  name: string;
  newPassword: string;
  repeatPassword: string;
}

export const CONFIG_REQUEST = 'CONFIG_REQUEST';
export const CONFIG_RESPONSE = 'CONFIG_RESPONSE';

export const editConf = (editData: EditProps): any => {
  return (
    dispatch: (arg0: { type: string; editInfo?: any; error?: string }) => void
  ) => {
    dispatch({
      type: CONFIG_REQUEST,
    });

    axios
      .request({
        url: '/users',
        method: 'PUT',
        baseURL: SERVER_BASE_URL,
        data: editData,
      })
      .then((response) => {
        const editInfo = response.data;

        dispatch({
          type: CONFIG_RESPONSE,
          editInfo,
        });
      })
      .catch((e) => {
        dispatch({
          type: CONFIG_RESPONSE,
          error: e.code,
        });
      });
  };
};
