import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';

export interface CircleFetchGetProps {
  userId: number;
}

export const CIRCLE_FETCH_REQUEST = 'CIRCLE_FETCH_REQUEST';
export const CIRCLE_FETCH_RESPONSE = 'CIRCLE_FETCH_RESPONSE';
export const CIRCLE_POST_REQUEST = 'CIRCLE_POST_REQUEST';
export const CIRCLE_POST_RESPONSE = 'CIRCLE_POST_RESPONSE';


export const circlePost = ():any => {
  return (
    dispatch: (arg0: { type: string; teamsData?: any; error?: string }) => void
  ) => {
    dispatch({
      type: CIRCLE_POST_REQUEST,
    });

    axios
      .request({
        url: '/teams',
        method: 'POST',
        baseURL: SERVER_BASE_URL,
      })
      .then(() => {
        dispatch({
          type: CIRCLE_POST_RESPONSE,
        });
      })
      .catch((e) => {
        dispatch({
          type: CIRCLE_POST_RESPONSE,
          error: e.code,
        });
      });
  };
};

export const circleFetch = (credentials: CircleFetchGetProps): any => {
  return (
    dispatch: (arg0: { type: string; teamsData?: any; error?: string }) => void
  ) => {
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
