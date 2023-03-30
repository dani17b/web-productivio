import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';

export const GET_RANKING_REQUEST = 'GET_RANKING_REQUEST';
export const GET_RANKING_RESPONSE = 'GET_RANKING_RESPONSE';
export interface RankingProps{
  email: string;
  name: string;
  description: string;
  userPoints: number;
  activeTasks: number;
  friends: number;
  userPicUrl: string;
  userColor: string;

}

export const postRanking = (rankingProps: RankingProps): any => {
  return (dispatch: (arg0: {type:string; rankingInfo? :any; error?:string}) => void) => {
    dispatch({
      type: GET_RANKING_REQUEST,
    });

    axios
      .request({
        url: '/users',
        method: 'POST',
        baseURL: SERVER_BASE_URL,
        data: rankingProps,
      })
      .then((response) => {
        console.log('API response', response.data);

        const rankingInfo = response.data;

        dispatch({
          type: GET_RANKING_RESPONSE,
          rankingInfo,
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_RANKING_RESPONSE,
          error: e.code,
        });
      });
  };
};

export const getRanking = (): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: GET_RANKING_REQUEST,
    });

    axios
      .request({
        url: '/users',
        method: 'GET',
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        console.log('API response', response.data);

        const ranking = response.data;

        dispatch({
          type: GET_RANKING_RESPONSE,
          ranking,
        });
      });
  };
};
