import login from '../modules/login/reducer';
import home from '../modules/home/reducer';
import {circleFetch, circlePost} from 'src/modules/circle/reducer';
import admin from '../modules/admin/reducer';
import form from '../modules/newTask/reducer';
import ranking from 'src/modules/ranking/reducer';
import usersFetch from 'src/modules/newTeam/reducer';

export const reducers = {
  login,
  home,
  admin,
  form,
  ranking,
  circleFetch,
  circlePost,
  usersFetch
};
