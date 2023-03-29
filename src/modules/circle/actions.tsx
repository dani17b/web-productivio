import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';

export interface CircleFetchProps {
  userId: number;
}

export const CIRCLE_FETCH_REQUEST = 'CIRCLE_FETCH_REQUEST';
export const CIRCLE_FETCH_RESPONSE = 'CIRCLE_FETCH_RESPONSE';

export const circleFetch = (credentials: CircleFetchProps): any => {
  return (
    dispatch: (arg0: { type: string; teamsData?: any; error?: string }) => void
  ) => {
    axios
      .request({
        url: '/teams',
        method: 'POST',
        baseURL: SERVER_BASE_URL,
      });
    dispatch({
      type: CIRCLE_FETCH_REQUEST,
    });

    axios
      .request({
        url: '/teams',
        method: 'GET',
        baseURL: SERVER_BASE_URL,
        data: credentials,
      })
      .then((response) => {
        const teamsData = response.data;

        dispatch({
          type: CIRCLE_FETCH_RESPONSE,
          teamsData: teamsData,
        });
      })
      .catch((e) => {
        dispatch({
          type: CIRCLE_FETCH_RESPONSE,
          error: e.code,
        });
      });
  };
};
