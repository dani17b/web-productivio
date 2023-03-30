import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Header, NavBar } from 'lib-productivio';
import { getPosts } from './actions';
import { useDispatch } from 'react-redux';
import { FeedBlock } from 'src/components/feedBlock/FeedBlock';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state: any) => state.home);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      {!loading && (
        <div>
          <Header count={0} title='Productivio'/>
          {posts.map((post: any) => (
            <FeedBlock
              borderColor={post.creatorUser.userColor}
              description={post.description}
              imageSrc={post.creatorUser.userPicUrl}
              username={post.creatorUser.name}
              totalLikes={post.likes}
              key={post.id}
              taskProgessBarPercent={post.taskBarProgress}
              comments={[]}
              createdAt={post.creationDate}
            />
          ))}
          <NavBar />
        </div>
        
      )}
      {loading && <div>{/*TODO: cambiar esto por la animación global*/ }cargando</div>}
    </>
  );
};
