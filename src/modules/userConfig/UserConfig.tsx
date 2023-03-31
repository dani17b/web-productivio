import {
  FormButton,
  Header,
  InputWithLabel,
  NavBar,
  UserPhoto,
} from 'lib-productivio';
import React from 'react';
import './userConfig.scss';

export const UserConfig = () => {
  return (
    <>
      <div className="header">
        <Header count={1} title={'Productivio'} />
      </div>
      <div className="container">
        <div className="photo_button">
          <div className="photo">
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
            />
          </div>
          <div className="data__password"></div>
          <div className="data__repeat__password"></div>
        </div>
      </div>
      <div className="navbar">
        <NavBar parentBackgroundColor="#1a3891" childBackgroundColor="white" />
      </div>
    </>
  );
};
