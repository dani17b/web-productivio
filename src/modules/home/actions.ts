
import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_RESPONSE = 'CREATE_USER_RESPONSE';

export const createUser = (): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: CREATE_USER_REQUEST,
    });

    axios
      .request({
        url: '/pet',
        method: 'POST',
        baseURL: SERVER_BASE_URL,
        data: {
          id: 10,
          name: 'doggie',
          category: {
            id: 1,
            name: 'Dogs',
          },
          photoUrls: ['string'],
          tags: [
            {
              id: 0,
              name: 'string',
            },
          ],
          status: 'available',
        },
      })
      .then((response) => {
        const userInfo = response.data;

        debugger;
        dispatch({
          type: CREATE_USER_RESPONSE,
          userInfo,
        });
      });
  };
};
