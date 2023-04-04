import { USER_REQUEST, USER_RESPONSE, TASK_REQUEST, TASK_RESPONSE } from './actions';

const initialState = {
  loading: false,
  user: null,
  tasks: null,
  error: null,
};

export const getUser = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        user: null,
      };
    case USER_RESPONSE:
      return {
        ...state,
        loading: false,
        user: action.user,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getTasks = (state = initialState, action: any) => {
  switch (action.type) {
    case TASK_REQUEST:
      return {
        ...state,
        loading: true
      };
    case TASK_RESPONSE:
      return {
        ...state,
        loading: false,
        tasks: action.tasks,
        error: action.error,
      };
    default:
      return state;
  }
};


