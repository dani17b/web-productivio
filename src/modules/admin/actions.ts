import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_RESPONSE = 'GET_USERS_RESPONSE';
export const SAVE_USER_REQUEST = 'SAVE_USER_REQUEST';
export const SAVE_USER_RESPONSE = 'SAVE_USER_RESPONSE';
export const REMOVE_USER_REQUEST = 'REMOVE_USER_REQUEST';
export const REMOVE_USER_RESPONSE = 'SAVE_USER_RESPONSE';

export const getUsers = (filters? : any): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: GET_USERS_REQUEST,
    });

    axios
      .request({
        url: `/users${filters && filters.name ? '?name=' + filters.name : ''}`,
        method: 'GET',
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        const users = response.data;

        dispatch({
          type: GET_USERS_RESPONSE,
          users,
        });
      });
  };
};

export const saveUser = (userToSave: any): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: SAVE_USER_REQUEST,
    });

    axios
      .request({
        url: '/users',
        method: userToSave.id ? 'PUT' : 'POST',
        baseURL: SERVER_BASE_URL,
        data: userToSave,
      })
      .then((response) => {
        const user = response.data;

        dispatch({
          type: SAVE_USER_RESPONSE,
          user,
        });

        dispatch(getUsers({}));
      });
  };
};

export const removeUser = (userToRemove: any): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: REMOVE_USER_REQUEST,
    });

    axios
      .request({
        url: `/users/${userToRemove.id}`,
        method: 'DELETE',
        baseURL: SERVER_BASE_URL
      })
      .then((response) => {
        const user = response.data;

        dispatch({
          type: REMOVE_USER_RESPONSE,
          user,
        });

        dispatch(getUsers({}));
      });
  };
};
