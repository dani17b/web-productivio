import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Header, NavBar } from 'lib-productivio';
import { getPosts } from './actions';
import { useDispatch } from 'react-redux';
import { FeedBlock } from 'src/components/feedBlock/FeedBlock';
import './home.scss';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state: any) => state.home);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handlePostClick = () => {
    console.log('Post clicked');
  };

  return (
    <>
      {!loading && (
        <div>
          <div className="header">
            <Header count={0} title="Productivio" />
          </div>
          {Array.isArray(posts) && posts.length > 0 ? (
            <div className="home-content">
              {posts.map((post: any) => (
                <FeedBlock
                  borderColor={post.creatorUser.userColor}
                  description={post.description}
                  imageSrc={post.creatorUser.userPicUrl}
                  username={post.creatorUser.name}
                  totalLikes={post.likes}
                  key={post.id}
                  taskProgessBarPercent={post.taskBarProgress}
                  postId={post.id}
                  createdAt={post.creationDate}
                  onPostClick={handlePostClick}
                />
              ))}
            </div>
          ) : (
            <div>No posts found!</div>
          )}

          <div className="navbar">
            <NavBar />
          </div>
        </div>
      )}
      {loading && (
        <div>{/*TODO: cambiar esto por la animación global*/}cargando</div>
      )}
    </>
  );
};
