import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

export const Home = () => {
  const { userInfo } = useSelector((state: any) => state.login);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo == null) {
      navigate('/login');
    }

    if (userInfo != null && userInfo.roles.indexOf('admin') === -1) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return (
    <>
      <div>Hola : {JSON.stringify(userInfo)}</div>

      <NavLink to="/admin">admin</NavLink>
    </>
  );
};
