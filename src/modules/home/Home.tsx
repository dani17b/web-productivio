import { useSelector,useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createUser } from './actions';

export const Home = () => {
  const { userInfo } = useSelector((state: any) => state.login);

  const dispatch = useDispatch();

  /* const navigate = useNavigate();

  useEffect(() => {
    if (userInfo == null) {
      navigate('/login');
    }

    if (userInfo != null && userInfo.roles.indexOf('admin') === -1) {
      navigate('/login');
    }
  }, [userInfo, navigate]); */

  return (
    <>
      <div>Hola : {JSON.stringify(userInfo)}</div>

      <NavLink to="/admin">admin</NavLink>

      <div onClick={() => {
        dispatch(createUser());
      }}>Crear</div>
    </>
  );
};
