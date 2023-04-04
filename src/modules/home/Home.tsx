import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'lib-productivio';
import { getPosts } from './actions';
import { useDispatch } from 'react-redux';
import { FeedBlock } from 'src/components/feedBlock/FeedBlock';
import { WebNavBar } from 'src/components/webNavBar/WebNavBar';
import { useNavigate } from 'react-router';

import './home.scss';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state: any) => state.home);
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const onShowCommentsClick = () => {
    navigate('/homeComments');
  };

  return (
    <div>
      {!loading && (
        <div className="home">
          <div className="home__header">
            <Header count={0} title="Productivio" />
          </div>
          <div className="home__content">
            {posts.map((post: any) => (
              <FeedBlock
                likedByMe={post.likedByMe}
                borderColor={post.creatorUser.userColor}
                description={post.description}
                imageSrc={post.creatorUser.userPicUrl}
                username={post.creatorUser.name}
                totalLikes={post.likes}
                key={post.id}
                taskProgessBarPercent={post.taskBarProgress}
                createdAt={post.creationDate}
                onShowCommentsClick={onShowCommentsClick}
              />
            ))}
          </div>
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
