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
export const FORM_GETDATA = 'FORM_GETDATA';

export const form = (formData: FormProps): any => {
  return (
    dispatch: (arg0: { type: string; formInfo?: any; error?: string }) => void
  ) => {
    dispatch({
      type: FORM_REQUEST,
    });

    axios
      .request({
        url: '/task',
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
