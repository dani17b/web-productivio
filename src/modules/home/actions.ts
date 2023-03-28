import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_RESPONSE = 'CREATE_POST_RESPONSE';
export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const GET_POSTS_RESPONSE = 'GET_POSTS_RESPONSE';

export const createPost = (): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: CREATE_POST_REQUEST,
    });

    axios
      .request({
        url: '/posts',
        method: 'POST',
        baseURL: SERVER_BASE_URL,
        data: {
          creatorUserId: 5,
          description: 'Check out this cool new feature we just released!',
          creationDate: '2023-03-23T10:30:00Z',
        },
      })
      .then((response) => {
        const postInfo = response.data;

        debugger;
        dispatch({
          type: CREATE_POST_RESPONSE,
          postInfo,
        });
      });
  };
};

export const getPosts = (): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: GET_POSTS_REQUEST,
    });

    axios
      .request({
        url: '/posts',
        method: 'GET',
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        const posts = response.data;

        debugger;
        dispatch({
          type: GET_POSTS_RESPONSE,
          posts,
        });
      });
  };
};
