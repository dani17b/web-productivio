import login from '../modules/login/reducer';
import { getUser, getTasks } from 'src/modules/userProfile/reducer';
import home from '../modules/home/reducer';
import { circleFetch, circlePost } from 'src/modules/circle/reducer';
import admin from '../modules/admin/reducer';
import form from '../modules/newTask/reducer';
import editConf from '../modules/userConfig/reducer';
import ranking from 'src/modules/ranking/reducer';
import { usersFetch, teamPost } from 'src/modules/newTeam/reducer';
import { editor, code, postFile } from '../modules/editor/reducer';

export const reducers = {
  login,
  home,
  admin,
  form,
  getTasks,
  getUser,
  editConf,
  ranking,
  circleFetch,
  circlePost,
  usersFetch,
  teamPost,
  editor,
  code,
  postFile,
};
