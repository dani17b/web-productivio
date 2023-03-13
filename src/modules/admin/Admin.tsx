import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
  const { userInfo } = useSelector((state: any) => state.login);

  const navigate = useNavigate();

  useEffect(() => {
    if(userInfo == null){
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return <div>Hola : {JSON.stringify(userInfo)} ESTO SOLO LO PUEDES VER SI ERES ADMIN</div>;
};
