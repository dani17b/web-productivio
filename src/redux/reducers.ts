import login from '../modules/login/reducer';
import home from '../modules/home/reducer';
import {circleFetch, circlePost} from 'src/modules/circle/reducer';
import admin from '../modules/admin/reducer';
import form from '../modules/newTask/reducer';
import editConf from '../modules/userConfig/reducer';
import ranking from 'src/modules/ranking/reducer';
import homeComments from 'src/modules/homeComments/reducer';

export const reducers = {
  login,
  home,
  admin,
  form,
  editConf,
  ranking,
  circleFetch,
  circlePost,
  homeComments
};
