import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';

export const GET_RANKING_REQUEST = 'GET_RANKING_REQUEST';
export const GET_RANKING_RESPONSE = 'GET_RANKING_RESPONSE';

export const postRanking = (): any => {
  debugger;
  return(
    (dispatch: (arg0: any) => void) => {
      dispatch({
        type: GET_RANKING_REQUEST,
      });
  
      axios
        .request({
          url: '/ranking',
          method: 'POST',
          baseURL: SERVER_BASE_URL,
        })
        .then((response) => {
          console.log('API response', response.data);
  
  
        });
      
    });
};

export const getRanking = (): any => {
  debugger;
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: GET_RANKING_REQUEST,
    });

    axios
      .request({
        url: '/ranking',
        method: 'POST',
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        console.log('API response', response.data);


      });
    
    axios
      .request({
        url: '/ranking',
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

