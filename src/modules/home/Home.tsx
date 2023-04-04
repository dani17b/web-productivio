import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'lib-productivio';
import { getPosts } from './actions';
import { useDispatch } from 'react-redux';
import { FeedBlock } from 'src/components/feedBlock/FeedBlock';
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
                comments={[]}
                createdAt={post.creationDate}
                onClick={onClick}
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
