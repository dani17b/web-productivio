import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormButton,
  Header,
  InputWithLabel,
  RoundButton,
  UserPhoto,
} from 'lib-productivio';
import React from 'react';
import { editConf, EditProps } from './actions';
import './userConfig.scss';
import { useDispatch } from 'react-redux';
import { WebNavBar } from 'src/components/webNavBar/WebNavBar';

export const UserConfig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState<EditProps>({
    name: '',
    newPassword: '',
    repeatPassword: '',
  });

  return (
    <>
      <div className="header" data-testid="userConfig-header">
        <Header count={1} title={'Productivio'} />
      </div>
      <div className="container" data-testid="userConfig-container">
        <div className="photo_button">
          <div className="photo" data-testid="user-photo">
            <UserPhoto
              imageSrc="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos.jpg"
              borderColor="blue"
            />
          </div>
          <div className="button">
            <FormButton
              buttonText="Subir imagen"
              fontSize={16}
              buttonColor="#1a3891"
              buttonWidth={200}
            />
          </div>
        </div>
        <div className="data">
          <div className="data__name">
            <InputWithLabel
              label="Nombre:"
              height={31}
              width={346}
              name="name"
              textColor="#1A3891"
              borderColor="#1A3891"
              fontSize={16}
              onChange={(value: any) => {
                setData({
                  ...data,
                  name: value,
                });
              }}
            />
          </div>
          <div className="data__password">
            <InputWithLabel
              label="Nueva contraseña:"
              height={31}
              width={346}
              name="name"
              textColor="#1A3891"
              borderColor="#1A3891"
              fontSize={16}
              onChange={(value: any) => {
                setData({
                  ...data,
                  newPassword: value,
                });
              }}
            />
          </div>
          <div className="data__repeat__password">
            <InputWithLabel
              label="Repetir contraseña:"
              height={31}
              width={346}
              name="name"
              textColor="#1A3891"
              borderColor="#1A3891"
              fontSize={16}
              onChange={(value: any) => {
                setData({
                  ...data,
                  repeatPassword: value,
                });
              }}
            />
          </div>
        </div>
        <div className="round__button">
          <RoundButton
            iconName="Save"
            bgColor="#1a3891"
            onClick={() => {
              dispatch(editConf(data));
              navigate('/user');
            }}
          />
        </div>
      </div>
      <div className="navbar">
        <WebNavBar/>
      </div>
    </>
  );
};
