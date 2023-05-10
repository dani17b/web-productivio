import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'lib-productivio';
import { getPosts } from './actions';
import { useDispatch } from 'react-redux';
import { WebNavBar } from 'src/components/webNavBar/WebNavBar';
import './home.scss';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state: any) => state.home);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const onClick = () => {
    console.log('dsdfsdf');
  };

  return (
    <div>
      {!loading && (
        <div className="home">
          <div className="home__header">
            <Header count={0} title="Productivio" />
          </div>
          <div className="home__content"></div>
          <div className="home__navbar">
            <WebNavBar />
          </div>
        </div>
      )}
      {loading && (
        <div className="home__loading">
          {/* <Loading autoplay={true} loop={true}/> */}
        </div>
      )}
    </div>
  );
};
