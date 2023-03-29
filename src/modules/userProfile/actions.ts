import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_RESPONSE = 'USER_RESPONSE';

export const getUser = (id: number): any => {
  return (
    dispatch: (arg0: { type: string; user?: {}; error?: string }) => void
  ) => {
    dispatch({
      type: USER_REQUEST,
    });

    axios
      .request({
        url: '/users/{userId}',
        method: 'GET',
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        const user = response.data;

        dispatch({
          type: USER_RESPONSE,
          user,
        });
      })
      .catch((e) => {
        console.log(e);
        debugger;
        dispatch({
          type: USER_RESPONSE,
          error: e.code,
        });
      });
  };
};
