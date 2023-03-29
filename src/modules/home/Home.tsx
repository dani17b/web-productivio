import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Header, NavBar } from 'lib-productivio';
import { createPost, getPosts } from './actions';
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
      <Header title="Productivio" count={0} />

      {!loading && (
        <div>
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
            />
          ))}
        </div>
      )}
      {loading && <div>cargando</div>}
      <NavBar />
      <button onClick={() => dispatch(createPost())}></button>
    </>
  );
};
