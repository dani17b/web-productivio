import login from '../modules/login/reducer';
import {getUser, getTasks} from 'src/modules/userProfile/reducer';
import home from '../modules/home/reducer';

export const reducers = {
  login,
  getUser,
  home, 
  getTasks
};
