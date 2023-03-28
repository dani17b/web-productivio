import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createPost, getPosts } from './actions';

export const Home = () => {
  const { posts } = useSelector((state: any) => state.home);

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

  useEffect(() => {
    // Obtener posts
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <NavLink to="/admin">admin</NavLink>

      <div
        onClick={() => {
          dispatch(createPost());
        }}
      >
        Crear
      </div>
      <div>Posts {posts.length} {JSON.stringify(posts)}</div>
    </>
  );
};
