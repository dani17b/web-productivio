import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';

export const getComments = (postId: number) : any => {
  axios
    .request({
      url: `/comments?postId=${postId}`,
      method: 'GET',
      baseURL: SERVER_BASE_URL,
    })
    .then((response) => {
      return response.data;
    });
};
