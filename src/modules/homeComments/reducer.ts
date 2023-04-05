import {
  GET_POSTS_REQUEST,
  GET_POSTS_RESPONSE,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_RESPONSE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_RESPONSE,
} from './actions';

const initialState = {
  comments: [],
  loadingPosts: false,
  loadingComments: false,
  postId: null,
};


const homeComments = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        loadingPosts: true,
      };
    case GET_POSTS_RESPONSE:
      return {
        ...state,
        posts: action.posts,
        loadingPosts: false,
      };
    case GET_COMMENTS_REQUEST:
      return {
        ...state,
        loadingComments: true,
      };
    case GET_COMMENTS_RESPONSE:
      return {
        ...state,
        comments: action.comments,
        loadingComments: false,
      };
    case CREATE_COMMENT_REQUEST:
      return {
        ...state,
        loadingComments: true,
      };
    case CREATE_COMMENT_RESPONSE:
      return {
        ...state,
        comments: [...state.comments, action.commentInfo],
        loadingComments: false,
      };
    default:
      return state;
  }
};
export default homeComments;
