import { 
  GET_POSTS_REQUEST, 
  GET_POSTS_RESPONSE, 
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
    default:
      return state;
  }
};
export default home;