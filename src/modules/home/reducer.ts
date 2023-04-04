import { 
  GET_POSTS_REQUEST, 
  GET_POSTS_RESPONSE, 
  GET_COMMENTS_REQUEST, 
  GET_COMMENTS_RESPONSE 
} from './actions';

const initialState = {
  loading: false,
  posts: [],
  comments: [],
  users: [],
};

const home = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        posts: [],
      };
    case GET_POSTS_RESPONSE:
      return {
        ...state,
        loading: false,
        posts: action.posts,
      };
    case GET_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        comments: [],
      };
    case GET_COMMENTS_RESPONSE:
      return {
        ...state,
        loading: false,
        comments: action.comments,
      };
    default:
      return state;
  }
};
export default home;