import login from '../modules/login/reducer';
import {getUser, getTasks} from 'src/modules/userProfile/reducer';
import home from '../modules/home/reducer';
import admin from '../modules/admin/reducer';
import form from '../modules/newTask/reducer';

export const reducers = {
  login,
  home,
  admin,
  form,
  getTasks,
  getUser,
};
