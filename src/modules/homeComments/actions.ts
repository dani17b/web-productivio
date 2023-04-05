import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';

export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const GET_POSTS_RESPONSE = 'GET_POSTS_RESPONSE';

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

        dispatch({
          type: GET_POSTS_RESPONSE,
          posts,
        });
      });
  };
};



export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_RESPONSE = 'CREATE_COMMENT_RESPONSE';
export const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST';
export const GET_COMMENTS_RESPONSE = 'GET_COMMENTS_RESPONSE';

export const createComment = (
  postId: number,
  creatorUserId: number,
  content: string
): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: CREATE_COMMENT_REQUEST,
    });

    axios
      .request({
        url: '/comments',
        method: 'POST',
        baseURL: SERVER_BASE_URL,
        data: {
          postId,
          creatorUserId,
          content,
        },
      })
      .then((response) => {
        const commentInfo = response.data;

        dispatch({
          type: CREATE_COMMENT_RESPONSE,
          commentInfo,
        });
      });
  };
};

export const getComments = (postId: number): any => {
  return (dispatch: (arg0: any) => void) => {
    dispatch({
      type: GET_COMMENTS_REQUEST,
    });

    axios
      .request({
        url: `/comments?postId=${postId}`,
        method: 'GET',
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        const comments = response.data;
        
        dispatch({
          type: GET_COMMENTS_RESPONSE,
          comments
        });
      });
  };
};