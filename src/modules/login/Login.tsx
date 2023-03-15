import { Input } from 'src/components/input/Input';
import './login.scss';
import { useEffect, useState } from 'react';
import { login, LoginProps } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [form, setForm] = useState<LoginProps>({
    login: '',
    password: '',
  });

  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector((state: any) => state.login);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo != null) {
      navigate('/home');
    }
  }, [userInfo, navigate]);

  return (
    <div className="login">
      <div className="login__info">
        <div className="login__info__icon">Icono</div>
        <div className="login__info__title">Titulo</div>
        <div className="login__info__description">
          descripcion :Count : {JSON.stringify(userInfo)}
        </div>
      </div>
      <div className="login__form">
        <div className="login__form__input-block">
          <Input
            type={'text'}
            onChange={(value) => {
              setForm({
                ...form,
                login: value,
              });
            }}
          />
        </div>
        <div className="login__form__input-block">
          <Input
            type={'password'}
            onChange={(value) => {
              setForm({
                ...form,
                password: value,
              });
            }}
          />
        </div>
        {!loading && (
          <div
            className="login__form__input-block"
            onClick={() => {
              // Validar los datos
              //console.log("usuario : ",usuario);
              //console.log("password : ", contraseña);
              // Enviar los datos
              console.log('Iniciar sesion con', form);

              dispatch(login(form));
            }}
          >
            Boton login{''}
          </div>
        )}
      </div>
    </div>
  );
};
