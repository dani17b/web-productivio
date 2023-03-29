import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';

export interface FormProps {
  name: string;
  description: string;
  date: string;
  difficulty: string;
  asign: string;
  workgroup: string;
}

export const FORM_REQUEST = 'FORM_REQUEST';
export const FORM_RESPONSE = 'FORM_RESPONSE';
export const TEAM_GETDATA = 'TEAM_GETDATA';
export const TEAM_RESPONSE = 'TEAM_RESPONSE';

export const fetchGroups = (): any => {
  return (
    dispatch: (arg0: { type: string; teamsInfo?: any; error?: string }) => void
  ) => {
    dispatch({
      type: TEAM_GETDATA,
    });

    axios
      .request({
        url: '/teams',
        method: 'GET',
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        const teamsInfo = response.data;

        dispatch({
          type: TEAM_RESPONSE,
          teamsInfo,
        });
      })
      .catch((e) => {
        dispatch({
          type: TEAM_RESPONSE,
          error: e.code,
        });
      });
  };
};

export const form = (formData: FormProps): any => {
  return (
    dispatch: (arg0: { type: string; formInfo?: any; error?: string }) => void
  ) => {
    dispatch({
      type: FORM_REQUEST,
    });

    axios
      .request({
        url: '/tasks',
        method: 'POST',
        baseURL: SERVER_BASE_URL,
        data: formData,
      })
      .then((response) => {
        const formInfo = response.data;

        dispatch({
          type: FORM_RESPONSE,
          formInfo,
        });
      })
      .catch((e) => {
        dispatch({
          type: FORM_RESPONSE,
          error: e.code,
        });
      });
  };
};
