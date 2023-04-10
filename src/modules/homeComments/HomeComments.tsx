import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getComments } from './actions';
import { Header, Loading } from 'lib-productivio';
import { WebNavBar } from 'src/components/webNavBar/WebNavBar';
import { FeedCommentsBlock } from 'src/components/feedCommentsBlock/FeedCommentsBlock';
import './homeComments.scss';
import { FeedBlock } from 'src/components/feedBlock/FeedBlock';

export const HomeComments = () => {
  const commentProps = {
    name: 'John Doe',
    imageSrc:
      'https://album.mediaset.es/eimg/2023/03/05/lluvia-de-memes-tras-el-podio-conseguido-por-fernando-alonso-en-barein_ef74.jpg?w=1200&h=900',
    inputText: '',
  };

  const postNumber = 0;
  const number = 1;
  const dispatch = useDispatch();
  const { comments, posts, loadingComments } =
    useSelector((state: any) => state.homeComments) || {};

  useEffect(() => {
    dispatch(getComments(number));
  }, [dispatch]);

  const handlePostClick = () => {
    console.log('Post clicked!');
  };

  return (
    <div>
      <div className="home-comments">
        <div className="home-comments__header">
          <Header count={5} title="Productivio" />
        </div>

        <div className="home-comments__content">
          {posts.length > 0 && (
            <FeedBlock
              likedByMe={posts[postNumber].likedByMe}
              borderColor={posts[postNumber].creatorUser.userColor}
              description={posts[postNumber].description}
              imageSrc={posts[postNumber].creatorUser.userPicUrl}
              username={posts[postNumber].creatorUser.name}
              totalLikes={posts[postNumber].likes}
              key={posts[postNumber].id}
              taskProgessBarPercent={posts[postNumber].taskBarProgress}
              createdAt={posts[postNumber].creationDate}
            />
          )}
        </div>

        {!loadingComments && (
          <div className="home-comments__comments">
            <FeedCommentsBlock
              commentProps={commentProps}
              visualCommentsProps={comments}
              onPostClick={handlePostClick}
            />
          </div>
        )}

        <div className="home-comments__navbar">
          <WebNavBar />
        </div>
      </div>

      <div className="home-comments__loading">
        {loadingComments && <Loading autoplay={true} loop={true} />}
      </div>
    </div>
  );
};
