import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';

export const USERS_FETCH_REQUEST = 'USERS_FETCH_REQUEST';
export const USERS_FETCH_RESPONSE = 'USERS_FETCH_RESPONSE';

export const usersFetch = (): any => {
  return (
    dispatch: (arg0: { type: string; usersData?: any; error?: string }) => void
  ) => {
    dispatch({
      type: USERS_FETCH_REQUEST,
    });

    axios
      .request({
        url: '/users',
        method: 'GET',
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        const usersData = response.data;

        dispatch({
          type: USERS_FETCH_RESPONSE,
          usersData,
        });
      })
      .catch((e) => {
        dispatch({
          type: USERS_FETCH_RESPONSE,
          error: e.code,
        });
      });
  };
};
