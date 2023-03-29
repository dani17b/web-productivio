import login from '../modules/login/reducer';
import home from '../modules/home/reducer';
import {circleFetch, circlePost} from 'src/modules/circle/reducer';

export const reducers = {
  login,
  home,
  circleFetch,
  circlePost
};
