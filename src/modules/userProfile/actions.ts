import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_RESPONSE = 'USER_RESPONSE';

export const TASK_REQUEST = 'TASK_REQUEST';
export const TASK_RESPONSE = 'TASK_RESPONSE';

//TODO hacer un mapper para user

export const UserMapper = (data: any) => {
  return {
    username: data.name,
    userImg: data.userPicUrl,
    description: data.description,
    contactsNumber: data.friends,
    //TODO cambiar esto por el calculado
    level: 6,
    mision: 3,
    currentTasks: 4,
    userColor: data.userColor,
    totalPoints: data.userPoints,
  };
};

export const getUser = (): any => {
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
        console.log('data', response.data);
        const user = UserMapper(response.data[0].creatorUser);
        dispatch({
          type: USER_RESPONSE,
          user,
        });
      })
      .catch((e) => {
        dispatch({
          type: USER_RESPONSE,
          error: e.code,
        });
      });
  };
};

export const getTasks = (): any => {
  return (
    dispatch: (arg0: { type: string; tasks?: []; error?: string }) => void
  ) => {
    dispatch({
      type: TASK_REQUEST,
    });
    axios
      .request({
        url: '/tasks',
        method: 'GET',
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        const tasks = response.data;
        dispatch({
          type: TASK_RESPONSE,
          tasks,
        });
      })
      .catch((e) => {
        dispatch({
          type: USER_RESPONSE,
          error: e.code,
        });
      });
  };
};
